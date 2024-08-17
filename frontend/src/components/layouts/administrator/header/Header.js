import { Box, Flex, HStack, Spacer, Text, useMediaQuery } from '@chakra-ui/react';
import { FaSearch } from "react-icons/fa";

import { container, shopText, title } from './header.style';
import DrawerButton from './DrawerButton';
import Profile from './Profile';
import Notification from './notification/Notification';
import useGetWidth from '../../../../hooks/useGetWidth';
import Message from './message/Message';
import useAuth from '../../../../hooks/useAuth';

const Header = () => {
    const [isLargerThan950] = useMediaQuery('(min-width: 950px)')
    const width = useGetWidth();
    const { isAdmin } = useAuth();

    return (
        <Flex sx={{ ...container, h: isLargerThan950 ? '8vh':'12vh' }} position={!isLargerThan950 ? 'fixed' : 'none'} top='0' bg='lightgray'>
            <Flex alignItems='center' p={isLargerThan950 ? '15px' : 0}>
                {!isLargerThan950 && <DrawerButton />}

                <Box>
                    <Text sx={{ ...title, fontSize: isLargerThan950 ? "28px" : "22px", fontWeight: "bold" }}>
                        On
                        <Text as='span' sx={{ ...shopText, fontWeight: "bold" }}>
                            Shop
                        </Text>
                    </Text>
                </Box>



            </Flex>
            <Spacer />
            <HStack gap='4' zIndex={999}>
                {isAdmin && <>
                    <FaSearch />
                    <Message />
                    <Notification /></>}
                <Profile />
            </HStack>
        </Flex>
    );
};

export default Header;