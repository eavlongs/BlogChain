"use client";
import "./globals.css";
import { Providers } from "./provider";
import Navbar from "@/components/Navbar";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="bg-gray-100">
            <body className="bg-gray-100">
                <Providers>
                    <Navbar />
                    <main className="mx-auto w-full max-w-[1000px] p-4">
                        {children}
                    </main>
                </Providers>
            </body>
        </html>
    );
}
