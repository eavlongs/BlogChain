"use server";

import { db } from "@/drizzle/db";
import { blogs, users } from "@/drizzle/schema";
import { formatDate } from "@/lib/utils";
import { BlogType } from "@/types/types";
import { desc, eq } from "drizzle-orm";

export default async function getBlogs(): Promise<BlogType[]> {
    const returnedBlogs = await db
        .select({
            id: blogs.id,
            title: blogs.title,
            description: blogs.description,
            imageUrl: blogs.imageUrl,
            user: {
                id: users.id,
                name: users.name,
                profilePicture: users.profilePicture,
            },
            createdAt: blogs.createdAt,
        })
        .from(blogs)
        .innerJoin(users, eq(blogs.userId, users.id))
        .orderBy(desc(blogs.createdAt));

    for (const blog of returnedBlogs) {
        if (blog.user.profilePicture === null) {
            blog.user.profilePicture = "";
        }
    }

    const formattedBlogs: BlogType[] = returnedBlogs.map((blog) => {
        return {
            id: blog.id,
            title: blog.title,
            description: blog.description,
            user: {
                id: blog.user.id,
                name: blog.user.name,
                profilePicture: blog.user.profilePicture || "",
            },
            imageUrl: blog.imageUrl || "",
            createdAt: formatDate(blog.createdAt.toString()),
        };
    });

    return formattedBlogs;
}
