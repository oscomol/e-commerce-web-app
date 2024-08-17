import {
    Drawer,
    DrawerBody,
    DrawerOverlay,
    DrawerContent,
    useDisclosure,
    Text,
    Box,
    Badge
} from '@chakra-ui/react'
import { FaListUl } from 'react-icons/fa';
import DrawerLinks from './DrawerLinks';

const DrawerNavs = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const closeDrawer = () => {
        onClose();
    }

    return (
        <>
            <Text fontSize='25px' mr='10px' color='gray' onClick={onOpen}><FaListUl /></Text>
            <Drawer placement="left" onClose={closeDrawer} isOpen={isOpen} size="xs">
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerBody p='0' bg='white'>
                        <Box p='15px' borderBottom='1px solid lightgray'>
                            <Badge bg='none' color='gray' fontSize='l'>Navigations</Badge>
                        </Box>
                        <DrawerLinks closeDrawer={closeDrawer} />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default DrawerNavs;