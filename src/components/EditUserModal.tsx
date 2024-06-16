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
import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";

export default function EditUserModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { currentUser: user } = useContext(CurrentUserContext);
    return user ? (
        <>
            <Button
                colorScheme='teal'
                variant='ghost'
                onClick={onOpen}
                className='group'
            >
                <div className='flex items-center gap-4'>
                    <h2 className='font-bold text-white group-hover:text-black'>
                        {user.name}
                    </h2>
                    <Avatar size='sm' src={user.profilePicture}></Avatar>
                </div>
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit User</ModalHeader>
                    <ModalCloseButton />
                    <form action={editUser}>
                        <ModalBody className='grid gap-4'>
                            <input
                                type='hidden'
                                name='user_id'
                                value={user.id}
                            />
                            <Avatar
                                src={user.profilePicture}
                                className='object-cover rounded-full aspect-square'
                                width={128}
                                height={128}
                            />
                            <label>
                                <input
                                    type='file'
                                    className='hidden'
                                    accept='image/*'
                                    name='profile_picture'
                                />
                                <Button as='span'>Change Profile</Button>
                            </label>
                            <Input
                                type='text'
                                defaultValue={user.name}
                                name='name'
                                placeholder='Username...'
                            />
                        </ModalBody>

                        <ModalFooter>
                            <Button mr={3} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='blue' type='submit'>
                                Save
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    ) : (
        <Button
            colorScheme='teal'
            variant='ghost'
            onClick={onOpen}
            className='group'
        >
            <div className='flex items-center gap-4'>
                <h2 className='font-bold text-white group-hover:text-black'>
                    No User Selected
                </h2>
                <Avatar size='sm' />
            </div>
        </Button>
    );
}
