import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button
  } from '@chakra-ui/react'
  import { FaListUl } from 'react-icons/fa';
  
import Navigation from '../navigation/Navigation';
import UserNavs from '../../Users/userDashboard/navigation/Navigation';
import useAuth from '../../../../hooks/useAuth';

const DrawerButton = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {role} = useAuth();
    
    const closeDrawer = () => {
        onClose();
    }

    return (
       <>
        <Button bg='none' onClick={onOpen}><FaListUl /></Button>
        <Drawer placement="left" onClose={closeDrawer} isOpen={isOpen} size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody p='0'>
            {role === 1 ? <Navigation closeDrawer={closeDrawer}/>:<UserNavs closeDrawer={closeDrawer}/>}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
       </>
    );
};

export default DrawerButton;