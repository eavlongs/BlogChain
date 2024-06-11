"use client";
import { formatDate } from "@/lib/utils";
import { BlogType } from "@/types/types";
import {
    Avatar,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    IconButton,
    Text,
} from "@chakra-ui/react";
import {
    IconDots,
    IconEdit,
    IconHeart,
    IconHeartFilled,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Blog({
    blog,
    showEdit = false,
    isLiked = false,
}: {
    blog: BlogType;
    showEdit?: boolean;
    isLiked?: boolean;
}) {
    const [liked, setLiked] = useState(isLiked);

    useEffect(() => {
        setLiked(isLiked);
    }, [isLiked]);

    return (
        <Card>
            <CardHeader className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Avatar src={blog.user.profilePicture}></Avatar>
                    <h2 className="font-bold text-lg">{blog.user.name}</h2>
                </div>
                {showEdit && (
                    <Link href={`/blog/edit/${blog.id}`}>
                        <IconButton
                            icon={<IconEdit />}
                            aria-label="Edit Blog Button"
                        />
                    </Link>
                )}
            </CardHeader>
            <Image
                src={blog.imageUrl}
                alt="Blog Image"
                className="object-cover w-full h-auto"
                sizes="100vw"
                width={0}
                height={0}
            />
            <CardBody className="grid gap-2">
                <Text className="text-lg font-bold">{blog.title}</Text>
                <Text>{blog.description}</Text>
                <Text fontWeight={700}>{formatDate(blog.createdAt)}</Text>
                <div className="mt-2 flex justify-end">
                    <IconButton
                        onClick={() => {
                            setLiked(!liked);
                        }}
                        colorScheme={liked ? "pink" : "teal"}
                        icon={liked ? <IconHeartFilled /> : <IconHeart />}
                        aria-label="Like Blog Button"
                    />
                </div>
            </CardBody>
        </Card>
    );
}
