"use client";
import Blog from "@/components/Blog";
import CreateUserModal from "@/components/CreateUserModal";
import User from "@/components/User";
import { BlogType, UserType } from "@/types/types";
import { Link } from "@chakra-ui/next-js";
import { IconButton } from "@chakra-ui/react";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import getUsers from "./actions/get-users";

export default function Home() {
    const blogs: BlogType[] = [
        {
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
        },
        {
            id: 2,
            title: "Urban Photography Tips",
            description:
                "Top tips for capturing stunning photos in urban environments.",
            imageUrl: "https://picsum.photos/800/500?random=2",
            user: {
                id: 102,
                name: "Jane Smith",
                profilePicture:
                    "https://randomuser.me/api/portraits/women/2.jpg",
            },
            createdAt: "2024-06-05T14:45:00Z",
        },
        {
            id: 3,
            title: "Cooking the Perfect Steak",
            description:
                "A step-by-step guide to cooking the perfect steak every time.",
            imageUrl: "https://picsum.photos/800/500?random=3",
            user: {
                id: 103,
                name: "Bob Brown",
                profilePicture: "https://randomuser.me/api/portraits/men/3.jpg",
            },
            createdAt: "2024-06-10T09:00:00Z",
        },
        {
            id: 4,
            title: "The Benefits of Yoga",
            description:
                "Exploring the physical and mental benefits of practicing yoga.",
            imageUrl: "https://picsum.photos/800/500?random=4",
            user: {
                id: 104,
                name: "Alice Green",
                profilePicture:
                    "https://randomuser.me/api/portraits/women/4.jpg",
            },
            createdAt: "2024-06-12T08:20:00Z",
        },
        {
            id: 5,
            title: "Traveling on a Budget",
            description:
                "Tips and tricks for seeing the world without breaking the bank.",
            imageUrl: "https://picsum.photos/800/500?random=5",
            user: {
                id: 105,
                name: "Charlie White",
                profilePicture: "https://randomuser.me/api/portraits/men/5.jpg",
            },
            createdAt: "2024-06-14T13:15:00Z",
        },
    ];

    const [users, setUsers] = useState<UserType[]>([]);

    // const users: UserType[] = [
    //     {
    //         id: 101,
    //         name: "John Doe",
    //         profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
    //     },
    //     {
    //         id: 102,
    //         name: "Jane Smith",
    //         profilePicture: "https://randomuser.me/api/portraits/women/2.jpg",
    //     },
    //     {
    //         id: 103,
    //         name: "Bob Brown",
    //         profilePicture: "https://randomuser.me/api/portraits/men/3.jpg",
    //     },
    //     {
    //         id: 104,
    //         name: "Alice Green",
    //         profilePicture: "https://randomuser.me/api/portraits/women/4.jpg",
    //     },
    //     {
    //         id: 105,
    //         name: "Charlie White",
    //         profilePicture: "https://randomuser.me/api/portraits/men/5.jpg",
    //     },
    //     {
    //         id: 106,
    //         name: "Emily Clark",
    //         profilePicture: "https://randomuser.me/api/portraits/women/5.jpg",
    //     },
    //     {
    //         id: 107,
    //         name: "David Wilson",
    //         profilePicture: "https://randomuser.me/api/portraits/men/6.jpg",
    //     },
    //     {
    //         id: 108,
    //         name: "Sophia Martinez",
    //         profilePicture: "https://randomuser.me/api/portraits/women/6.jpg",
    //     },
    //     {
    //         id: 109,
    //         name: "James Johnson",
    //         profilePicture: "https://randomuser.me/api/portraits/men/7.jpg",
    //     },
    //     {
    //         id: 110,
    //         name: "Mia Taylor",
    //         profilePicture: "https://randomuser.me/api/portraits/women/7.jpg",
    //     },
    // ];
    const user: UserType = {
        id: 101,
        name: "John Doe",
        profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
    };

    useEffect(() => {
        async function fetchData() {
            const _users = await getUsers();
            setUsers(_users);
        }
        fetchData();
    }, []);

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
