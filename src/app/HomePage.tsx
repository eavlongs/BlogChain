"use client";
import Blog from "@/components/Blog";
import CreateUserModal from "@/components/CreateUserModal";
import User from "@/components/User";
import { UsersContext } from "@/components/UsersContext";
import { BlogType, UserType } from "@/types/types";
import { Link } from "@chakra-ui/next-js";
import { IconButton } from "@chakra-ui/react";
import { IconPlus } from "@tabler/icons-react";
import { useContext } from "react";

export default function Home({ blogs }: { blogs: BlogType[] }) {
    const users = useContext(UsersContext);

    const user: UserType = {
        id: 101,
        name: "John Doe",
        profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
    };

    return (
        <div className='grid grid-cols-4 gap-8'>
            <section className='col-span-3 grid'>
                <div className='flex items-center justify-between mb-4'>
                    <h1 className='text-2xl font-bold'>
                        Blogs - {blogs.length}
                    </h1>
                    <Link href={"/blog/create"}>
                        <IconButton
                            size='sm'
                            colorScheme='blue'
                            icon={<IconPlus />}
                            aria-label='Create Blog Button'
                        />
                    </Link>
                </div>
                <ul className='w-full grid gap-4'>
                    {blogs.map((blog, i) => {
                        return (
                            <Blog
                                blog={blog}
                                key={`blog-${blog.id}-${i}`}
                                showEdit={blog.user.id == user.id}
                                isLiked={blog.user.id == user.id}
                            />
                        );
                    })}
                </ul>
            </section>
            <section>
                <div className='flex items-center justify-between mb-4'>
                    <h1 className='text-2xl font-bold'>
                        Users - {users.length}
                    </h1>
                    <CreateUserModal />
                </div>
                <ul className='grid gap-2'>
                    {users.map((user, i) => {
                        return (
                            <User user={user} key={`user-${user.id}-${i}`} />
                        );
                    })}
                </ul>
            </section>
        </div>
    );
}
