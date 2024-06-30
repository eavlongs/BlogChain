"use server";

import { db } from "@/drizzle/db";
import { users } from "@/drizzle/schema";
import { calculateHash } from "@/lib/utils";
import { User } from "@/types/types";
import { desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { createFile } from "./create-file";

export default async function CreateUser(formData: FormData) {
    const name = formData.get("name") as string;
    const filenames = await createFile(formData);
    let previousHash = "0";
    let id = 1;
    let newRecordNo = 1;

    const lastInsertUser = await db
        .select()
        .from(users)
        .orderBy(desc(users.id), desc(users.record_no))
        .limit(1);

    const lastUserEntry = await db
        .select()
        .from(users)
        .orderBy(desc(users.record_no))
        .limit(1);

    if (lastInsertUser.length > 0) {
        previousHash = lastUserEntry[0].hash;
        id = lastInsertUser[0].id + 1;
        newRecordNo = lastUserEntry[0].record_no + 1;
    }

    const newUser: User = {
        record_no: newRecordNo,
        id,
        createdAt: new Date(),
        previousHash,
        name,
        version: 0,
        type: "INSERT",
        profilePicture: filenames[0],
        hash: "",
    };

    newUser.hash = calculateHash(newUser);

    await db.insert(users).values(newUser);
    revalidatePath("/");
}
