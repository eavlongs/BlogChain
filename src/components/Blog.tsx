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
    useToast,
} from "@chakra-ui/react";
import {
    IconDots,
    IconEdit,
    IconHeart,
    IconHeartFilled,
    IconTrash,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import DeleteBlogModal from "./DeleteBlogModal";
import { CurrentUserContext } from "./CurrentUserContext";
import likeBlog from "@/app/actions/like-blog";

export default function Blog({ blog }: { blog: BlogType }) {
    const { currentUser: user } = useContext(CurrentUserContext);
    const isOwner = user?.id === blog.user.id;
    const liked = blog.likes.some((like) => like.userId === user?.id);
    const toast = useToast();

    return (
        <Card>
            <CardHeader className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Avatar src={blog.user.profilePicture}></Avatar>
                    <h2 className="font-bold text-lg">{blog.user.name}</h2>
                </div>
                {/* show edit */}
                {isOwner && (
                    <div className="flex gap-2">
                        <Link href={`/blog/edit/${blog.id}`}>
                            <IconButton
                                icon={<IconEdit />}
                                aria-label="Edit Blog Button"
                            />
                        </Link>
                        <DeleteBlogModal
                            blogId={blog.id}
                            userId={blog.user.id}
                        />
                    </div>
                )}
            </CardHeader>
            {blog.imageUrl && <Image
                src={blog.imageUrl}
                alt="Blog Image"
                className="object-cover w-full h-auto"
                sizes="100vw"
                width={0}
                height={0}
            />}
            <CardBody className="grid gap-2">
                <Text className="text-lg font-bold">{blog.title}</Text>
                <Text>{blog.description}</Text>
                <Text fontWeight={700}>{formatDate(blog.createdAt)}</Text>
                <div className="mt-2 flex justify-end items-center">
                    <Text
                        className="
                        font-bold
                        text-lg
                        mr-2
                    "
                    >
                        {blog.likes.length}
                    </Text>
                    <IconButton
                        onClick={async () => {
                            if (!user) {
                                toast({
                                    position: "top",
                                    title: "Not logged in",
                                    description:
                                        "Duma mey, you need to login to like a blog post.",
                                    status: "error",
                                    duration: 2500,
                                    isClosable: true,
                                });
                                return;
                            }

                            await likeBlog(user.id, blog.id);
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
