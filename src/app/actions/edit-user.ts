"use server";

import { db } from "@/drizzle/db";
import { users } from "@/drizzle/schema";
import { calculateHash } from "@/lib/utils";
import { User } from "@/types/types";
import { asc, desc, eq } from "drizzle-orm";
import { alias } from "drizzle-orm/mysql-core";
import { revalidatePath } from "next/cache";
import { createFile } from "./create-file";

export default async function editUser(formData: FormData) {
    const userId = parseInt(formData.get("user_id")?.toString() ?? "");
    const filenames = await createFile(formData);
    let userExists = true;

    const parent = alias(users, "parent");
    const child = alias(users, "child");
    const existingUserHistory = await db
        .select()
        .from(parent)
        .innerJoin(child, eq(child.id, parent.id))
        .where(eq(parent.id, userId))
        .orderBy(desc(child.version));

    if (existingUserHistory.length === 0) {
        userExists = false;
    }

    for (const user of existingUserHistory) {
        if (user.child?.type === "DELETE") {
            userExists = false;
            break;
        }
    }

    if (!userExists) {
        throw new Error("User not found");
    }

    const lastUser = await db
        .select()
        .from(users)
        .orderBy(desc(users.record_no))
        .limit(1);

    const updatedUser: User = {
        record_no: lastUser[0].record_no + 1,
        id: userId,
        name: formData.get("name")!.toString(),
        profilePicture: filenames[0],
        type: "UPDATE",
        previousHash: lastUser[0].hash,
        version: existingUserHistory[0].child.version + 1,
        createdAt: new Date(),
        hash: "",
    };
    updatedUser.hash = calculateHash(updatedUser);

    await db.insert(users).values(updatedUser);
    revalidatePath("/");
}
