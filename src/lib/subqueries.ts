import { db } from "@/drizzle/db";
import { blogs, users } from "@/drizzle/schema";
import { eq, sql } from "drizzle-orm";
import { alias } from "drizzle-orm/mysql-core";

const users_parent = alias(users, "users_parent");
const users_child = alias(users, "users_child");

export const users_sq = db
    .select({
        id: users_child.id,
        users_max_version: sql`max(${users_child.version})`.as(
            "users_max_version"
        ),
    })
    .from(users_parent)
    .innerJoin(users_child, eq(users_parent.id, users_child.id))
    .groupBy(users_child.id)
    .as("users_sq");

const blogs_parent = alias(blogs, "blogs_parent");
const blogs_child = alias(blogs, "blogs_child");

export const blogs_sq = db
    .select({
        id: blogs_child.id,
        blogs_max_version: sql`max(${blogs_child.version})`.as(
            "blogs_max_version"
        ),
    })
    .from(blogs_parent)
    .innerJoin(blogs_child, eq(blogs_parent.id, blogs_child.id))
    .groupBy(blogs_child.id)
    .as("blogs_sq");
