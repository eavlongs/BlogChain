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
    Input,
    Stack,
    Text,
    Textarea,
} from "@chakra-ui/react";
import { IconDots, IconEdit, IconHeart, IconTrash } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export default function BlogEditPage() {
    const blog: BlogType = {
        id: 1,
        title: "Exploring the Mountains",
        description:
            "A detailed account of my adventures hiking through the Rocky Mountains.",
        imageUrl: "https://picsum.photos/800/500?random=1",
        user: {
            id: 101,
            name: "John Doe",
            profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
        },
        createdAt: "2024-06-01T10:30:00Z",
    };
    return (
        <div className="grid grid-cols-4 gap-8">
            <section className="col-span-3">
                <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>
                <Card>
                    <CardHeader className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <Avatar src={blog.user.profilePicture}></Avatar>
                            <h2 className="font-bold text-lg">
                                {blog.user.name}
                            </h2>
                        </div>
                    </CardHeader>
                    <div className="relative">
                        <label className="absolute bottom-4 right-4">
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                            ></input>
                            <Button as="span">Change Image</Button>
                        </label>
                        <Image
                            src={blog.imageUrl}
                            alt="Blog Image"
                            className="object-cover w-full h-auto"
                            sizes="100vw"
                            width={0}
                            height={0}
                        />
                    </div>
                    <CardBody className="grid gap-2">
                        <Input
                            className="text-lg font-bold"
                            value={blog.title}
                            placeholder="Blog Title..."
                        />
                        <Textarea placeholder="Blog description...">
                            {blog.description}
                        </Textarea>
                        <Input type="date" value={blog.createdAt} />
                        <div className="mt-2 flex justify-between">
                            <Button colorScheme="red">Delete</Button>
                            <div className="flex gap-2">
                                <Link href="/">
                                    <Button>Cancel</Button>
                                </Link>
                                <Button colorScheme="blue">Save</Button>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </section>
        </div>
    );
}
