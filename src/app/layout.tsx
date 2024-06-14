import ClientLayout from "./ClientLayout";
import getUsers from "./actions/get-users";
import "./globals.css";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const users = await getUsers();
    return <ClientLayout users={users}>{children}</ClientLayout>;
}
