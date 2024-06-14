"use client";
import createBlog from "@/app/actions/create-blog";
import { CurrentUserContext } from "@/components/CurrentUserContext";
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

export default function CreateBlog() {
    const { currentUser: user } = useContext(CurrentUserContext);
    const placeHolderImage = "https://placehold.co/600x400?text=Upload+Image";
    return user ? (
        <div className='grid grid-cols-4 gap-8'>
            <section className='col-span-3'>
                <h1 className='text-2xl font-bold mb-4'>Create Blog</h1>

                <form action={createBlog}>
                    <Card>
                        <CardHeader className='flex items-center justify-between gap-4'>
                            <div className='flex items-center gap-4'>
                                <Avatar src={user.profilePicture} />
                                <h2 className='font-bold text-lg'>
                                    {user.name}
                                </h2>
                            </div>
                            <input
                                type='hidden'
                                name='user_id'
                                value={user.id}
                            />
                        </CardHeader>
                        <div className='relative'>
                            <label className='absolute bottom-4 right-4'>
                                <input
                                    type='file'
                                    className='hidden'
                                    accept='image/*'
                                    name='image'
                                />
                                <Button as='span'>Upload Image</Button>
                            </label>
                            <Image
                                src={placeHolderImage}
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
                                placeholder='Blog Title...'
                                name='title'
                            />
                            <Textarea
                                placeholder='Blog description...'
                                name='description'
                            ></Textarea>
                            {/* Date should not be here */}
                            <Input type='date' />
                            <div className='mt-2 flex justify-end gap-2'>
                                <Link href='/'>
                                    <Button>Cancel</Button>
                                </Link>
                                <Button colorScheme='blue' type='submit'>
                                    Create
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                </form>
            </section>
        </div>
    ) : (
        <p className='text-lg'>Please select a user first</p>
    );
}