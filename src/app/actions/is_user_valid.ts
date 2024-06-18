"use server";

import { db } from "@/drizzle/db";
import { users } from "@/drizzle/schema";
import { calculateHash } from "@/lib/utils";
import { asc } from "drizzle-orm";

export default async function isUserValid(): Promise<boolean> {
    const _users = await db.query.users.findMany({
        orderBy: asc(users.record_no),
    });

    for (let i = 0; i < _users.length; i++) {
        const prev_user = i > 0 ? _users[i - 1] : null;
        const user = _users[i];

        const calculatedHash = calculateHash({
            ...user,
            hash: "",
        });

        if (user.hash !== calculatedHash) {
            return false;
        }

        if (prev_user && user.previousHash !== prev_user.hash) {
            return false;
        }
    }

    return true;
}
