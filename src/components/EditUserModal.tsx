"use client";

import editUser from "@/app/actions/edit-user";
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
import { useContext, useEffect, useState } from "react";
import { filenameToURL } from "@/lib/files";
import { useUsers } from "./UsersProvider";
import getUsers from "@/app/actions/get-users";

export default function EditUserModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { users, currentUser, setCurrentUser } = useUsers();
    const placeHolderImage = "https://placehold.co/128x128?text=Profile";
    const [imageSrc, setImageSrc] = useState(currentUser?.profilePicture);

    useEffect(() => {
        if (currentUser) {
            setImageSrc(currentUser.profilePicture);
        }
    }, [currentUser]);

    return currentUser ? (
        <>
            <Button
                colorScheme="teal"
                variant="ghost"
                onClick={onOpen}
                className="group"
            >
                <div className="flex items-center gap-4">
                    <h2 className="font-bold text-white group-hover:text-black">
                        {currentUser.name}
                    </h2>
                    <Avatar
                        size="sm"
                        src={filenameToURL(currentUser.profilePicture)}
                    ></Avatar>
                </div>
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit User</ModalHeader>
                    <ModalCloseButton />
                    <form
                        action={editUser}
                        onSubmit={() => {
                            setTimeout(() => {
                                window.location.reload();
                            }, 200);
                        }}
                    >
                        <ModalBody className="grid gap-4">
                            <input
                                type="hidden"
                                name="user_id"
                                value={currentUser.id}
                            />
                            <Avatar
                                src={filenameToURL(imageSrc)}
                                className="object-cover rounded-full aspect-square"
                                width={128}
                                height={128}
                            />
                            <label>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    name="image"
                                    required
                                    onChange={(e) => {
                                        if (
                                            e.target.files &&
                                            e.target.files[0]
                                        ) {
                                            //console.log(
                                            //     "File type:",
                                            //     e.target.files[0].type,
                                            // );
                                            setImageSrc(
                                                URL.createObjectURL(
                                                    e.target.files[0]
                                                )
                                            );
                                        }
                                    }}
                                />
                                <Button as="span">Change Profile</Button>
                            </label>
                            <Input
                                type="text"
                                defaultValue={currentUser.name}
                                name="name"
                                placeholder="Username..."
                            />
                        </ModalBody>

                        <ModalFooter>
                            <Button mr={3} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="blue" type="submit">
                                Save
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    ) : (
        <Button
            colorScheme="teal"
            variant="ghost"
            onClick={onOpen}
            className="group"
        >
            <div className="flex items-center gap-4">
                <h2 className="font-bold text-white group-hover:text-black">
                    No User Selected
                </h2>
                <Avatar size="sm" />
            </div>
        </Button>
    );
}
