"use client";
import Navbar from "@/components/Navbar";
import { UsersContext } from "@/components/UsersContext";
import { UserType } from "@/types/types";
import "./globals.css";
import { Providers } from "./provider";
import { CurrentUserContext } from "@/components/CurrentUserContext";
import { useState } from "react";

export default function RootLayout({
    children,
    users,
}: {
    children: React.ReactNode;
    users: UserType[];
}) {
    const [currentUser, setCurrentUser] = useState<UserType | undefined>(
        undefined
    );
    return (
        <html lang='en' className='bg-gray-100'>
            <body className='bg-gray-100'>
                <Providers>
                    <UsersContext.Provider value={users}>
                        <CurrentUserContext.Provider
                            value={{ currentUser, setCurrentUser }}
                        >
                            <Navbar />
                            <main className='mx-auto w-full max-w-[1000px] p-4'>
                                {children}
                            </main>
                        </CurrentUserContext.Provider>
                    </UsersContext.Provider>
                </Providers>
            </body>
        </html>
    );
}
