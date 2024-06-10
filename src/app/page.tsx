"use client";
import { Link } from "@chakra-ui/next-js";
import { Avatar, Button } from "@chakra-ui/react";

export default function Home() {
    return (
        <div>
            <nav className="bg-teal-500">
                <div className="flex justify-between p-4 items-center mx-auto w-full max-w-[1000px] text-white">
                    <h1 className="text-3xl font-bold">BlogChain</h1>
                    <div className="flex items-center gap-4">
                        <Link href={"/"}>Home</Link>
                        <Avatar src="https://avatars.githubusercontent.com/u/100892730?v=4"></Avatar>
                    </div>
                </div>
            </nav>
            <main className="mx-auto w-full max-w-[1000px] p-4 ">
                <Button>Button</Button>
            </main>
        </div>
    );
}
