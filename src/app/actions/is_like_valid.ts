"use server";

import { db } from "@/drizzle/db";
import { likes } from "@/drizzle/schema";
import { calculateHash } from "@/lib/utils";
import { asc } from "drizzle-orm";

export default async function isLikeValid(): Promise<boolean> {
    const _likes = await db.query.likes.findMany({
        orderBy: asc(likes.record_no),
    });

    for (let i = 0; i < _likes.length; i++) {
        const prev_like = i > 0 ? _likes[i - 1] : null;
        const like = _likes[i];

        const calculatedHash = calculateHash({
            ...like,
            hash: "",
        });

        if (like.hash !== calculatedHash) {
            return false;
        }

        if (prev_like && like.previousHash !== prev_like.hash) {
            return false;
        }
    }

    return true;
}
