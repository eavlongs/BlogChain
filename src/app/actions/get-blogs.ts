"use server";

import { db } from "@/drizzle/db";
import { blogs, users } from "@/drizzle/schema";
import { blogs_sq, users_sq } from "@/lib/subqueries";
import { formatDate } from "@/lib/utils";
import { BlogType } from "@/types/types";
import { and, desc, eq } from "drizzle-orm";

export default async function getBlogs(): Promise<BlogType[]> {
    console.log(
        db
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
            .orderBy(desc(blogs.createdAt))
            .toSQL()
    );
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
