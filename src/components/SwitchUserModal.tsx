"use client";
import {
    Avatar,
    Button,
    IconButton,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from "@chakra-ui/react";
import { IconRepeat } from "@tabler/icons-react";
import { useContext } from "react";
import { UsersContext } from "./UsersContext";
import { CurrentUserContext } from "./CurrentUserContext";

export default function SwitchUserModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const users = useContext(UsersContext);
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

    return (
        <>
            <IconButton
                className='group'
                onClick={onOpen}
                colorScheme='teal'
                variant='ghost'
                icon={
                    <IconRepeat className='text-white group-hover:text-black' />
                }
                aria-label='Switch User Button'
            />
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Switch to User</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody className='grid gap-2'>
                        {users.map((user, i) => {
                            return (
                                <Button
                                    key={`user-${user.id}-${i}`}
                                    size='lg'
                                    className='grid items-start gap-4 p-3 justify-start'
                                    onClick={() => {
                                        setCurrentUser(user);
                                        onClose();
                                    }}
                                >
                                    <Avatar
                                        src={user.profilePicture}
                                        size='sm'
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
