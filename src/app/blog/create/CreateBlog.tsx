"use client";
import createBlog from "@/app/actions/create-blog";
import { useUsers } from "@/components/UsersProvider";
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
import { useContext, useState } from "react";

export default function CreateBlog() {
    const { users, currentUser, setCurrentUser } = useUsers();
    const placeHolderImage = "https://placehold.co/600x400?text=Upload+Image";
    const [imageSrc, setImageSrc] = useState(placeHolderImage);
    return currentUser ? (
        <div className='grid grid-cols-4 gap-8'>
            <section className='col-span-3'>
                <h1 className='text-2xl font-bold mb-4'>Create Blog</h1>

                <form action={createBlog}>
                    <Card>
                        <CardHeader className='flex items-center justify-between gap-4'>
                            <div className='flex items-center gap-4'>
                                <Avatar src={currentUser.profilePicture} />
                                <h2 className='font-bold text-lg'>
                                    {currentUser.name}
                                </h2>
                            </div>
                            <input
                                type='hidden'
                                name='user_id'
                                value={currentUser.id}
                            />
                        </CardHeader>
                        <div className='relative'>
                            <label className='absolute bottom-4 right-4'>
                                <input
                                    type='file'
                                    className='hidden'
                                    accept='image/*'
                                    name='image'
                                    required
                                    onChange={(e) => {
                                        if (
                                            e.target.files &&
                                            e.target.files[0]
                                        ) {
                                            //console.log(
                                            //     "File type:",
                                            //     e.target.files[0].type,
                                            // );
                                            setImageSrc(
                                                URL.createObjectURL(
                                                    e.target.files[0]
                                                )
                                            );
                                        }
                                    }}
                                />
                                <Button as='span'>Upload Image</Button>
                            </label>
                            <Image
                                src={imageSrc}
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
