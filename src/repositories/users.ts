import { db } from "@/drizzle/db"

export const getUsers = async () => {
    return await db.query.users.findMany();
}