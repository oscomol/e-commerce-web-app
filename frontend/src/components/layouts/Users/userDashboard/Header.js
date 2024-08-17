import { Flex, Heading, Spacer, HStack } from '@chakra-ui/react';

import Profile from '../../administrator/header/Profile';

const Header = () => {
    
    return (
        <Flex w='100%' paddingInline='15px' paddingBlock='10px' align='center' boxShadow='0px 4px 6px rgba(0, 0, 0, 0.1)' bg='lightgray' h='8vh'>
            <Heading color="orange" fontSize='30px'>LOGO</Heading>
            <Spacer />
            <Profile />
        </Flex>
    );
};

export default Header;