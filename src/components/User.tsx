"use client";
import { filenameToURL } from "@/lib/files";
import { UserType } from "@/types/types";
import { Avatar, Card, CardBody } from "@chakra-ui/react";

export default function User({ user }: { user: UserType }) {
    return (
        <Card>
            <div className="flex gap-4 items-center p-3">
                <Avatar src={filenameToURL(user.profilePicture)} size="sm" />
                <h1>{user.name}</h1>
            </div>
        </Card>
    );
}
