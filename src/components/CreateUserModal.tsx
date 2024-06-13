"use client";
import CreateUser from "@/app/actions/create-user";
import {
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
import { IconPlus } from "@tabler/icons-react";
import Image from "next/image";

export default function CreateUserModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const placeHolderImage = "https://placehold.co/128x128?text=Profile";
    return (
        <>
            <IconButton
                onClick={onOpen}
                size='sm'
                colorScheme='blue'
                icon={<IconPlus />}
                aria-label='Create User Button'
            />
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create User</ModalHeader>
                    <ModalCloseButton />
                    <form action={CreateUser}>
                        <ModalBody className='grid gap-4'>
                            <Image
                                src={placeHolderImage}
                                alt='Blog Image'
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
                                <Button as='span'>Upload Profile</Button>
                            </label>
                            <Input type='text' placeholder='Name' name='name' />
                        </ModalBody>

                        <ModalFooter>
                            <Button mr={3} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='blue' type='submit'>
                                Create
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
}
