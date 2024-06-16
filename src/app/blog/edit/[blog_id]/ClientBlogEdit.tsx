"use client";
import editBlog from "@/app/actions/edit.blog";
import { CurrentUserContext } from "@/components/CurrentUserContext";
import { BlogType } from "@/types/types";
import {
    Avatar,
    Button,
    Card,
    CardBody,
    CardHeader,
    Input,
    Textarea,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

export default function ClientBlogEdit({ blog }: { blog: BlogType }) {
    const { currentUser: user } = useContext(CurrentUserContext);

    return user && blog.user.id === user.id ? (
        <div className='grid grid-cols-4 gap-8'>
            <section className='col-span-3'>
                <h1 className='text-2xl font-bold mb-4'>Edit Blog</h1>
                <form action={editBlog}>
                    <Card>
                        <CardHeader className='flex items-center justify-between gap-4'>
                            <div className='flex items-center gap-4'>
                                <Avatar src={blog.user.profilePicture}></Avatar>
                                <h2 className='font-bold text-lg'>
                                    {blog.user.name}
                                </h2>
                            </div>
                        </CardHeader>
                        <input type='hidden' name='blog_id' value={blog.id} />
                        <input
                            type='hidden'
                            name='user_id'
                            value={blog.user.id}
                        />

                        <div className='relative'>
                            <label className='absolute bottom-4 right-4'>
                                <input
                                    type='file'
                                    className='hidden'
                                    accept='image/*'
                                    name='image'
                                />
                                <Button as='span'>Change Image</Button>
                            </label>
                            <Image
                                src={blog.imageUrl}
                                alt='Blog Image'
                                className='object-cover w-full h-auto'
                                sizes='100vw'
                                width={0}
                                height={0}
                            />
                        </div>
                        <CardBody className='grid gap-2'>
                            <Input
                                className='text-lg font-bold'
                                name='title'
                                defaultValue={blog.title}
                                placeholder='Blog Title...'
                            />
                            <Textarea
                                placeholder='Blog description...'
                                name='description'
                            >
                                {blog.description}
                            </Textarea>
                            <Input type='date' value={blog.createdAt} />
                            <div className='mt-2 flex justify-between'>
                                <Button colorScheme='red'>Delete</Button>
                                <div className='flex gap-2'>
                                    <Link href='/'>
                                        <Button>Cancel</Button>
                                    </Link>
                                    <Button colorScheme='blue' type='submit'>
                                        Save
                                    </Button>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </form>
            </section>
        </div>
    ) : (
        <h1 className='text-xl text-center font-bold'>Action not permitted</h1>
    );
}
