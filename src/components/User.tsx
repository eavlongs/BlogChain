"use client";
import { UserType } from "@/types/types";
import { Avatar, Card, CardBody } from "@chakra-ui/react";

export default function User({ user }: { user: UserType }) {
    return (
        <Card>
            <div className="flex gap-4 items-center p-3">
                <Avatar src={user.profilePicture} size="sm" />
                <h1>{user.name}</h1>
            </div>
        </Card>
    );
}
