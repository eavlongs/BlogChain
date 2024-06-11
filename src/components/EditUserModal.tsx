"use client";
import { UserType } from "@/types/types";
import {
    Avatar,
    Button,
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
import Image from "next/image";

export default function EditUserModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const user: UserType = {
        id: 101,
        name: "John Doe",
        profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
    };
    return (
        <>
            <Button
                colorScheme="teal"
                variant="ghost"
                onClick={onOpen}
                className="group"
            >
                <div className="flex items-center gap-4">
                    <h2 className="font-bold text-white group-hover:text-black">
                        {user.name}
                    </h2>
                    <Avatar size="sm" src={user.profilePicture}></Avatar>
                </div>
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit User</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody className="grid gap-4">
                        <Image
                            src={user.profilePicture}
                            alt="Blog Image"
                            className="object-cover rounded-full aspect-square"
                            width={128}
                            height={128}
                        />
                        <label>
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                            ></input>
                            <Button as="span">Change Profile</Button>
                        </label>
                        <Input
                            type="text"
                            value={user.name}
                            placeholder="Username..."
                        />
                    </ModalBody>

                    <ModalFooter>
                        <Button mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="blue">Save</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
