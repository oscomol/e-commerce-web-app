import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure
} from '@chakra-ui/react';

const ModalCont = ({ btn, size, title, footer, body, footerP }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            {btn(onOpen)}
            <Modal blockScrollOnMount={true} size={size} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {body(onClose)}
                    </ModalBody>

                    <ModalFooter p={!footerP && '0'}>
                        {footer && footer(onClose)}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalCont;