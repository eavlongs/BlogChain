import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
    record_no: int("record_no").primaryKey().autoincrement(),
    id: int("id").notNull(),
    name: varchar("name", {
        length: 100,
    }).notNull(),
    previousHash: varchar("previous_hash", {
        length: 150,
    })
        .notNull()
        .unique(),
    hash: varchar("hash", {
        length: 150,
    })
        .notNull()
        .unique(),
    profilePicture: varchar("profile_picture", {
        length: 1000,
    }),
    type: varchar("type", {
        length: 100,
        // add type here example .$type<"admin" | "user">()
    })
        .notNull()
        .$type<"INSERT" | "UPDATE" | "DELETE">(),
    // referenceTo: int("reference_to").notNull().default(0),
    version: int("version").notNull().default(0),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const blogs = mysqlTable("blogs", {
    record_no: int("record_no").primaryKey().autoincrement(),
    id: int("id").notNull(),
    userId: int("user_id").notNull(),
    // .references(() => users.id, {
    //     // if want to delete all blogs of user when user is deleted
    //     // onDelete: "cascade",
    // }),
    title: varchar("title", {
        length: 100,
    }).notNull(),
    description: varchar("description", {
        length: 1000,
    }).notNull(),
    imageUrl: varchar("image_url", {
        length: 1000,
    }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    previousHash: varchar("previous_hash", {
        length: 150,
    })
        .notNull()
        .unique(),
    hash: varchar("hash", {
        length: 150,
    })
        .notNull()
        .unique(),
    type: varchar("type", {
        length: 100,
        // add type here
    })
        .notNull()
        .$type<"INSERT" | "UPDATE" | "DELETE">(),
    // referenceTo: int("reference_to").notNull().default(0),
    version: int("version").notNull().default(0),
});

export const likes = mysqlTable("likes", {
    record_no: int("record_no").primaryKey().autoincrement(),
    id: int("id").notNull(),
    userId: int("user_id").notNull(),
    // .references(() => users.id, {
    //     // if want to delete all likes of user when user is deleted
    //     // onDelete: "cascade",
    // }),
    blogId: int("blog_id").notNull(),
    // .references(() => blogs.id, {
    //     // if want to delete all likes of blog when blog is deleted
    //     // onDelete: "cascade",
    // }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    previousHash: varchar("previous_hash", {
        length: 150,
    })
        .notNull()
        .unique(),
    hash: varchar("hash", {
        length: 150,
    })
        .notNull()
        .unique(),
    type: varchar("type", {
        length: 100,
        // add type here
    })
        .notNull()
        .$type<"INSERT" | "UPDATE" | "DELETE">(),
    // referenceTo: int("reference_to").notNull().default(0),
    version: int("version").notNull().default(0),
});
