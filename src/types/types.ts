import { blogs, likes, users } from "@/drizzle/schema";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type BlogType = {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    user: UserType;
    likes: LikeType[];
    createdAt: string;
};

export type UserType = {
    id: number;
    name: string;
    profilePicture: string;
};

export type LikeType = {
    id: number;
    userId: number;
    blogId: number;
};

export type User = InferSelectModel<typeof users>;
export type Blog = InferSelectModel<typeof blogs>;
export type Like = InferSelectModel<typeof likes>;

export type UserInsert = InferInsertModel<typeof users>;
export type BlogInsert = InferInsertModel<typeof blogs>;
export type LikeInsert = InferInsertModel<typeof likes>;
