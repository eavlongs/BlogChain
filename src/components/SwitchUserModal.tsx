"use client";
import { UserType } from "@/types/types";
import {
    Avatar,
    Button,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from "@chakra-ui/react";
import { IconPlus, IconRepeat } from "@tabler/icons-react";
import Image from "next/image";
import User from "./User";

export default function SwitchUserModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const users: UserType[] = [
        {
            id: 101,
            name: "John Doe",
            profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
        },
        {
            id: 102,
            name: "Jane Smith",
            profilePicture: "https://randomuser.me/api/portraits/women/2.jpg",
        },
        {
            id: 103,
            name: "Bob Brown",
            profilePicture: "https://randomuser.me/api/portraits/men/3.jpg",
        },
        {
            id: 104,
            name: "Alice Green",
            profilePicture: "https://randomuser.me/api/portraits/women/4.jpg",
        },
        {
            id: 105,
            name: "Charlie White",
            profilePicture: "https://randomuser.me/api/portraits/men/5.jpg",
        },
        {
            id: 106,
            name: "Emily Clark",
            profilePicture: "https://randomuser.me/api/portraits/women/5.jpg",
        },
        {
            id: 107,
            name: "David Wilson",
            profilePicture: "https://randomuser.me/api/portraits/men/6.jpg",
        },
        {
            id: 108,
            name: "Sophia Martinez",
            profilePicture: "https://randomuser.me/api/portraits/women/6.jpg",
        },
        {
            id: 109,
            name: "James Johnson",
            profilePicture: "https://randomuser.me/api/portraits/men/7.jpg",
        },
        {
            id: 110,
            name: "Mia Taylor",
            profilePicture: "https://randomuser.me/api/portraits/women/7.jpg",
        },
    ];
    return (
        <>
            <IconButton
                className="group"
                onClick={onOpen}
                colorScheme="teal"
                variant="ghost"
                icon={
                    <IconRepeat className="text-white group-hover:text-black" />
                }
                aria-label="Switch User Button"
            />
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Switch to User</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody className="grid gap-2">
                        {users.map((user, i) => {
                            return (
                                <Button
                                    size="lg"
                                    className="grid items-start gap-4 p-3"
                                >
                                    <Avatar
                                        src={user.profilePicture}
                                        size="sm"
                                    />
                                    <h1>{user.name}</h1>
                                </Button>
                            );
                        })}
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
