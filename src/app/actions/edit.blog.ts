"use server";

import { db } from "@/drizzle/db";
import { blogs } from "@/drizzle/schema";
import { calculateHash } from "@/lib/utils";
import { Blog } from "@/types/types";
import { asc, desc, eq } from "drizzle-orm";
import { alias } from "drizzle-orm/mysql-core";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createFile } from "./create-file";

export default async function editBlog(formData: FormData) {
    const blogId = parseInt(formData.get("blog_id")!.toString());
    const userId = parseInt(formData.get("user_id")!.toString());
    const filenames = await createFile(formData);

    let blogExists = true;

    const parent = alias(blogs, "parent");
    const child = alias(blogs, "child");

    const existingBlogHistory = await db
        .select()
        .from(parent)
        .innerJoin(child, eq(child.id, parent.id))
        .where(eq(parent.id, blogId))
        .orderBy(desc(child.version));

    console.log(existingBlogHistory);

    if (existingBlogHistory.length === 0) {
        blogExists = false;
    }

    for (const blog of existingBlogHistory) {
        if (blog.child?.type === "DELETE") {
            blogExists = false;
            break;
        }
    }

    if (existingBlogHistory[0].child.userId !== userId) {
        throw new Error("user not allowed to edit this blog");
    }

    if (!blogExists) {
        throw new Error("Blog not found");
    }

    const lastBlog = await db
        .select()
        .from(blogs)
        .orderBy(desc(blogs.record_no))
        .limit(1);

    const updatedBlog: Blog = {
        record_no: lastBlog[0].record_no + 1,
        id: blogId,
        userId: userId,
        title: formData.get("title")!.toString(),
        description: formData.get("description")!.toString(),
        imageUrl: filenames[0],
        type: "UPDATE",
        previousHash: lastBlog[0].hash,
        version: existingBlogHistory[0].child.version + 1,
        createdAt: new Date(),
        hash: "",
    };
    updatedBlog.hash = calculateHash(updatedBlog);

    await db.insert(blogs).values(updatedBlog);
    revalidatePath("/");
    redirect("/");
}
