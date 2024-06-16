"use server";

import { db } from "@/drizzle/db";
import { blogs } from "@/drizzle/schema";
import { calculateHash } from "@/lib/utils";
import { Blog } from "@/types/types";
import { desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function createBlog(formData: FormData) {
    let previousHash = "0";
    let id = 1;
    let newRecordNo = 1;

    const lastInsertBlog = await db
        .select()
        .from(blogs)
        .orderBy(desc(blogs.id), desc(blogs.record_no))
        .limit(1);

    const lastEntryBlog = await db
        .select()
        .from(blogs)
        .orderBy(desc(blogs.record_no))
        .limit(1);

    if (lastInsertBlog.length > 0) {
        previousHash = lastEntryBlog[0].hash;
        id = lastInsertBlog[0].id + 1;
        newRecordNo = lastEntryBlog[0].record_no + 1;
    }

    const newBlog: Blog = {
        record_no: newRecordNo,
        id,
        userId: parseInt(formData.get("user_id") as string),
        createdAt: new Date(),
        previousHash,
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        imageUrl: "",
        version: 0,
        type: "INSERT",
        hash: "",
    };

    newBlog.hash = calculateHash(newBlog);

    await db.insert(blogs).values(newBlog);
    revalidatePath("/");
    redirect("/");
}
