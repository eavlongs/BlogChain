import { blogs, likes, users } from "@/drizzle/schema";
import { InferSelectModel } from "drizzle-orm";

export type BlogType = {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    user: UserType;
    createdAt: string;
};

export type UserType = {
    id: number;
    name: string;
    profilePicture: string;
};

export type User = InferSelectModel<typeof users>;
export type Blog = InferSelectModel<typeof blogs>;
export type Like = InferSelectModel<typeof likes>;
