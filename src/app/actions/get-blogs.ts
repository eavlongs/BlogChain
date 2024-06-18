"use server";

import { db } from "@/drizzle/db";
import { blogs, likes, users } from "@/drizzle/schema";
import { blogs_sq, likes_sq, users_sq } from "@/lib/subqueries";
import { formatDate } from "@/lib/utils";
import { BlogType } from "@/types/types";
import { and, desc, eq, not } from "drizzle-orm";

export default async function getBlogs(): Promise<BlogType[]> {
    // console.log(
    //     db
    //         .select({
    //             id: blogs.id,
    //             title: blogs.title,
    //             description: blogs.description,
    //             imageUrl: blogs.imageUrl,
    //             user: {
    //                 id: users.id,
    //                 name: users.name,
    //                 profilePicture: users.profilePicture,
    //             },
    //             createdAt: blogs.createdAt,
    //         })
    //         .from(blogs)
    //         .innerJoin(
    //             blogs_sq,
    //             and(
    //                 eq(blogs.id, blogs_sq.id),
    //                 eq(blogs.version, blogs_sq.blogs_max_version)
    //             )
    //         )
    //         .innerJoin(users, eq(blogs.userId, users.id))
    //         .innerJoin(
    //             users_sq,
    //             and(
    //                 eq(users.id, users_sq.id),
    //                 eq(users.version, users_sq.users_max_version)
    //             )
    //         )
    //         .orderBy(desc(blogs.createdAt))
    //         .toSQL()
    // );

    const returnedBlogs = await db
        .select({
            id: blogs.id,
            title: blogs.title,
            description: blogs.description,
            imageUrl: blogs.imageUrl,
            type: blogs.type,
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

    const likesLatestVersionByBlogId_sq = async (blogId: number) => {
        return await db
            .select({
                userId: likes.userId,
                blogId: likes.blogId,
                id: likes.id,
                type: likes.type,
                version: likes.version,
            })
            .from(likes)
            .innerJoin(
                likes_sq,
                and(
                    eq(likes.id, likes_sq.id),
                    eq(likes.version, likes_sq.likes_max_version)
                )
            )
            .where(
                and(eq(likes.blogId, blogId), not(eq(likes.type, "DELETE")))
            );
    };

    for (const blog of returnedBlogs) {
        if (blog.user.profilePicture === null) {
            blog.user.profilePicture = "";
        }
    }
    // const likes = await likesLatestVersionByBlogId_sq(blog.id);

    const formattedBlogs = returnedBlogs.filter((blog) => {
        return blog.type !== "DELETE";
    });

    const blogsLikes = new Map<
        number,
        Awaited<ReturnType<typeof likesLatestVersionByBlogId_sq>>
    >();

    for (const blog of formattedBlogs) {
        const likes = await likesLatestVersionByBlogId_sq(blog.id);
        blogsLikes.set(blog.id, likes);
    }

    const blogsWithLike = formattedBlogs.map((blog) => {
        return {
            id: blog.id,
            title: blog.title,
            description: blog.description,
            user: {
                id: blog.user.id,
                name: blog.user.name,
                profilePicture: blog.user.profilePicture || "",
            },
            likes: blogsLikes.get(blog.id) || [],
            imageUrl: blog.imageUrl || "",
            createdAt: formatDate(blog.createdAt.toString()),
        };
    });

    return blogsWithLike;
}
