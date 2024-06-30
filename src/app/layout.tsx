import { UsersProvider } from "@/components/UsersProvider";
import ClientLayout from "./ClientLayout";
import getUsers from "./actions/get-users";
import "./globals.css";
import { Providers } from "./provider";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const users = await getUsers();
    return (
        <html lang="en" className="bg-gray-100">
            <body className="bg-gray-100 relative">
                <Providers>
                    <UsersProvider>
                        <ClientLayout users={users}>{children}</ClientLayout>
                    </UsersProvider>
                </Providers>
            </body>
        </html>
    );
}
