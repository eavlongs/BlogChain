"use server";

import { db } from "@/drizzle/db";
import { blogs } from "@/drizzle/schema";
import { calculateHash } from "@/lib/utils";
import { asc } from "drizzle-orm";

export default async function isBlogValid(): Promise<boolean> {
    const _blogs = await db.query.blogs.findMany({
        orderBy: asc(blogs.record_no),
    });

    for (let i = 0; i < _blogs.length; i++) {
        const prev_blog = i > 0 ? _blogs[i - 1] : null;
        const blog = _blogs[i];

        const calculatedHash = calculateHash({
            ...blog,
            hash: "",
        });

        if (blog.hash !== calculatedHash) {
            return false;
        }

        if (prev_blog && blog.previousHash !== prev_blog.hash) {
            return false;
        }
    }

    return true;
}