import { UserType } from "@/types/types";
import { Avatar } from "@chakra-ui/react";
import Link from "next/link";
import EditUserModal from "./EditUserModal";
import SwitchUserModal from "./SwitchUserModal";

export default function Navbar() {
    return (
        <nav className="bg-teal-500">
            <div className="flex justify-between p-4 items-center mx-auto w-full max-w-[1000px] text-white">
                <Link href={"/"}>
                    <h1 className="text-3xl font-bold">BlogChain</h1>
                </Link>
                <div className="flex gap-2">
                    <SwitchUserModal />
                    <EditUserModal />
                </div>
            </div>
        </nav>
    );
}
