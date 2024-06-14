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

    const blog = await db
        .select()
        .from(blogs)
        .orderBy(desc(blogs.createdAt))
        .limit(1);

    if (blog.length > 0) {
        previousHash = blog[0].hash;
        id = blog[0].id + 1;
    }

    const newBlog: Blog = {
        id,
        userId: parseInt(formData.get("user_id") as string),
        createdAt: new Date(),
        previousHash,
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        imageUrl: "",
        referenceTo: 0,
        version: 0,
        type: "INSERT",
        hash: "",
    };

    newBlog.hash = calculateHash(newBlog);

    await db.insert(blogs).values(newBlog);
    revalidatePath("/");
    redirect("/");
}
