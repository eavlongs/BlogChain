"use client";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { Providers } from "./provider";
import { UsersProvider, useUsers } from "@/components/UsersProvider";
import { UserType } from "@/types/types";
import { useEffect } from "react";

export default function RootLayout({
    children,
    users,
}: {
    children: React.ReactNode;
    users: UserType[];
}) {
    const { setUsers } = useUsers();
    useEffect(() => {
        setUsers(users);
    }, []);
    return (
        <>
            <Navbar />
            <main className="mx-auto w-full max-w-[1000px] p-4">
                {children}
            </main>
        </>
    );
}
