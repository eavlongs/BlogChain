"use server";

import { db } from "@/drizzle/db";
import { users } from "@/drizzle/schema";
import { UserType } from "@/types/types";
import { asc } from "drizzle-orm";

export default async function getUsers(): Promise<UserType[]> {
    const returnedUsers = await db
        .select({
            id: users.id,
            name: users.name,
            profilePicture: users.profilePicture,
        })
        .from(users)
        .orderBy(asc(users.name));

    for (const user of returnedUsers) {
        if (user.profilePicture === null) {
            user.profilePicture = "";
        }
    }

    return returnedUsers as UserType[];
}
