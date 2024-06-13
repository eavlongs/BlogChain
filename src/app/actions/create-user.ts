"use server";

import { db } from "@/drizzle/db";
import { users } from "@/drizzle/schema";
import { calculateHash } from "@/lib/utils";
import { User } from "@/types/types";
import { desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export default async function CreateUser(formData: FormData) {
    const name = formData.get("name") as string;

    let previousHash = "0";
    let id = 1;

    const user = await db
        .select()
        .from(users)
        .orderBy(desc(users.createdAt))
        .limit(1);

    if (user.length > 0) {
        previousHash = user[0].hash;
        id = user[0].id + 1;
    }

    const newUser: User = {
        id,
        createdAt: new Date(),
        previousHash,
        name,
        referenceTo: 0,
        version: 0,
        type: "INSERT",
        profilePicture: null,
        hash: "",
    };

    newUser.hash = calculateHash(newUser);

    await db.insert(users).values(newUser);
    revalidatePath("/");
}
