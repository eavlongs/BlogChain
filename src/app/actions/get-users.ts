"use server";

import { db } from "@/drizzle/db";
import { users } from "@/drizzle/schema";
import { users_sq } from "@/lib/subqueries";
import { UserType } from "@/types/types";
import { and, eq, sql } from "drizzle-orm";
import { alias } from "drizzle-orm/mysql-core";

export default async function getUsers(): Promise<UserType[]> {
    const parent = alias(users, "parent");

    const returnedUsers = await db
        .select({
            id: users.id,
            name: users.name,
            profilePicture: users.profilePicture,
        })
        .from(users)
        .innerJoin(
            users_sq,
            and(
                eq(users.id, users_sq.id),
                eq(users.version, users_sq.users_max_version)
            )
        );

    for (const user of returnedUsers) {
        if (user.profilePicture === null) {
            user.profilePicture = "";
        }
    }

    return returnedUsers as UserType[];
}
