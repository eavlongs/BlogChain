"use client";
import deleteBlog from "@/app/actions/delete-blog";
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
import { IconTrash } from "@tabler/icons-react";

export default function DeleteBlogModal({ blogId, userId }: { blogId: number, userId: number}) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <IconButton
                onClick={onOpen}
                colorScheme="red"
                icon={<IconTrash />}
                aria-label="Delete Blog Button"
            />
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete Blog</ModalHeader>
                    <ModalCloseButton />
                    <form action={async () => {
                        await deleteBlog(blogId, userId);
                    }}>
                        <ModalBody className="grid gap-4">
                            <p>Are you sure you want to delete this blog?</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button mr={3} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button
                                colorScheme="red"
                                type="submit"
                                onClick={onClose}
                            >
                                Delete
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
}
