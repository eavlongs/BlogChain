"use client";
import Blog from "@/components/Blog";
import CreateUserModal from "@/components/CreateUserModal";
import { CurrentUserContext } from "@/components/CurrentUserContext";
import User from "@/components/User";
import { UsersContext } from "@/components/UsersContext";
import { BlogType, UserType } from "@/types/types";
import { Link } from "@chakra-ui/next-js";
import { Button, IconButton, useToast } from "@chakra-ui/react";
import { IconPlus } from "@tabler/icons-react";
import { useContext } from "react";
import isBlogValid from "./actions/is_blog_valid";
import isUserValid from "./actions/is_user_valid";
import isLikeValid from "./actions/is_like_valid";

export default function Home({ blogs }: { blogs: BlogType[] }) {
    const users = useContext(UsersContext);
    const { currentUser: user } = useContext(CurrentUserContext);
    const toast = useToast();

    return (
        <div className="grid grid-cols-4 gap-8">
            <section className="col-span-3 grid">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold">
                        Blogs - {blogs.length}
                    </h1>
                    <Link href={"/blog/create"}>
                        <IconButton
                            size="sm"
                            colorScheme="blue"
                            icon={<IconPlus />}
                            aria-label="Create Blog Button"
                        />
                    </Link>
                </div>
                <ul className="w-full grid gap-4">
                    {blogs.map((blog, i) => {
                        return (
                            <Blog blog={blog} key={`blog-${blog.id}-${i}`} />
                        );
                    })}
                </ul>
            </section>
            <section>
                <div className="flex flex-col gap-2">
                    <Button
                        onClick={async () => {
                            const isValid = await isBlogValid();
    
                            toast({
                                position: "top",
                                title: "Is blog valid?",
                                description: isValid ? "Blog is valid!" : "Blog is not valid!",
                                status: isValid ? "success" : "error",
                                duration: 2500,
                                isClosable: true,
                            });
                        }}
                    >
                        Is blog valid?
                    </Button>
                    <Button
                        onClick={async () => {
                            const isValid = await isUserValid();
    
                            toast({
                                position: "top",
                                title: "Is user valid?",
                                description: isValid ? "User is valid!" : "User is not valid!",
                                status: isValid ? "success" : "error",
                                duration: 2500,
                                isClosable: true,
                            });
                        }}
                    >
                        Is user valid?
                    </Button>
                    <Button
                        onClick={async () => {
                            const isValid = await isLikeValid();
    
                            toast({
                                position: "top",
                                title: "Is like valid?",
                                description: isValid ? "Like is valid!" : "Like is not valid!",
                                status: isValid ? "success" : "error",
                                duration: 2500,
                                isClosable: true,
                            });
                        }}
                    >
                        Is like valid?
                    </Button>
                </div>
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold">
                        Users - {users.length}
                    </h1>
                    <CreateUserModal />
                </div>
                <ul className="grid gap-2">
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
