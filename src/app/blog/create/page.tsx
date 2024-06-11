"use client";
import { formatDate } from "@/lib/utils";
import { BlogType, UserType } from "@/types/types";
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

export default function BlogCreatePage() {
    const user: UserType = {
        id: 101,
        name: "John Doe",
        profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
    };
    const placeHolderImage = "https://placehold.co/600x400?text=Upload+Image";
    return (
        <div className="grid grid-cols-4 gap-8">
            <section className="col-span-3">
                <h1 className="text-2xl font-bold mb-4">Create Blog</h1>
                <Card>
                    <CardHeader className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <Avatar src={user.profilePicture}></Avatar>
                            <h2 className="font-bold text-lg">{user.name}</h2>
                        </div>
                    </CardHeader>
                    <div className="relative">
                        <label className="absolute bottom-4 right-4">
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                            ></input>
                            <Button as="span">Upload Image</Button>
                        </label>
                        <Image
                            src={placeHolderImage}
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
                            placeholder="Blog Title..."
                        />
                        <Textarea placeholder="Blog description..."></Textarea>
                        <Input type="date" />
                        <div className="mt-2 flex justify-end gap-2">
                            <Link href="/">
                                <Button>Cancel</Button>
                            </Link>
                            <Button colorScheme="blue">Save</Button>
                        </div>
                    </CardBody>
                </Card>
            </section>
        </div>
    );
}
