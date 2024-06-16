"use server";

import { db } from "@/drizzle/db";
import { blogs, users } from "@/drizzle/schema";
import { blogs_sq, users_sq } from "@/lib/subqueries";
import { BlogType } from "@/types/types";
import { and, eq } from "drizzle-orm";

export async function getBlogById(id: number): Promise<BlogType | null> {
    const returnedBlog = await db
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
        .innerJoin(
            blogs_sq,
            and(
                eq(blogs.id, blogs_sq.id),
                eq(blogs.version, blogs_sq.blogs_max_version)
            )
        )
        .innerJoin(users, eq(blogs.userId, users.id))
        .innerJoin(
            users_sq,
            and(
                eq(users.id, users_sq.id),
                eq(users.version, users_sq.users_max_version)
            )
        )
        .where(eq(blogs.id, id));

    if (returnedBlog.length === 0) {
        return null;
    }

    if (returnedBlog[0].user.profilePicture === null) {
        returnedBlog[0].user.profilePicture = "";
    }

    if (returnedBlog[0].imageUrl === null) {
        returnedBlog[0].imageUrl = "";
    }

    return {
        id: returnedBlog[0].id,
        title: returnedBlog[0].title,
        description: returnedBlog[0].description,
        user: {
            id: returnedBlog[0].user.id,
            name: returnedBlog[0].user.name,
            profilePicture: returnedBlog[0].user.profilePicture || "",
        },
        imageUrl: returnedBlog[0].imageUrl || "",
        createdAt: returnedBlog[0].createdAt.toString(),
    };
}
