"use server";

import { db } from "@/drizzle/db";
import { likes } from "@/drizzle/schema";
import { calculateHash } from "@/lib/utils";
import { Like } from "@/types/types";
import { desc, eq, and } from "drizzle-orm";
import { alias } from "drizzle-orm/mysql-core";
import { revalidatePath } from "next/cache";

export default async function likeBlog(userId: number, blogId: number) {
    const parent = alias(likes, "parent");
    const child = alias(likes, "child");

    let likeExists = true;
    const existingLikesHistory = await db
        .select()
        .from(parent)
        .innerJoin(child, eq(child.id, parent.id))
        .where(and(eq(parent.blogId, blogId), eq(parent.userId, userId)))
        .orderBy(desc(child.version));

    if (existingLikesHistory.length === 0) {
        likeExists = false;
    }

    // if never existed before, just create a new like
    if (!likeExists) {
        let previousHash = "0";
        let id = 1;
        let newRecordNo = 1;
        const lastInsertLike = await db
            .select()
            .from(likes)
            .orderBy(desc(likes.id), desc(likes.record_no))
            .limit(1);

        const lastEntryLike = await db
            .select()
            .from(likes)
            .orderBy(desc(likes.record_no))
            .limit(1);

        if (lastInsertLike.length > 0) {
            previousHash = lastEntryLike[0].hash;
            id = lastInsertLike[0].id + 1;
            newRecordNo = lastEntryLike[0].record_no + 1;
        }

        const newLike: Like = {
            record_no: newRecordNo,
            id,
            blogId: blogId,
            userId: userId,
            createdAt: new Date(),
            previousHash,
            version: 0,
            type: "INSERT",
            hash: "",
        };

        newLike.hash = calculateHash(newLike);

        await db.insert(likes).values(newLike);
        revalidatePath("/");
        return;
    }

    if (existingLikesHistory[0].child.userId !== userId) {
        throw new Error(
            "User not allowed to like or dislike other user's blog like"
        );
    }

    const lastBlogLikeByUser = await db
        .select()
        .from(likes)
        .orderBy(desc(likes.record_no))
        .limit(1);

    let newLikeType: Like["type"] = "UPDATE";

    switch (lastBlogLikeByUser[0].type) {
        case "INSERT":
            newLikeType = "DELETE";
            break;
        case "UPDATE":
            newLikeType = "DELETE";
            break;
        case "DELETE":
            newLikeType = "UPDATE";
            break;
    }

    const updatedBlogLikeByUser: Like = {
        record_no: lastBlogLikeByUser[0].record_no + 1,
        id: lastBlogLikeByUser[0].id,
        blogId: blogId,
        userId: userId,
        createdAt: new Date(),
        previousHash: lastBlogLikeByUser[0].hash,
        version: lastBlogLikeByUser[0].version + 1,
        type: newLikeType,
        hash: "",
    };
    updatedBlogLikeByUser.hash = calculateHash(updatedBlogLikeByUser);

    await db.insert(likes).values(updatedBlogLikeByUser);
    revalidatePath("/");
}
