import { Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const DrawerRedNavs = ({link, closeDrawer}) => {

    return (
        <Flex gap={5} w='100%' p='10px 10px 10px 20px' align='center' _hover={{ bg: 'gray', color: 'white' }} bg={link.active ? 'gray':'none'} color={link.active ? 'white':'alpha.500'}>
            {link.icon}
            <Text as={Link} fontWeight='bold' to={link.link} onClick={closeDrawer}>{link.name}</Text>
        </Flex>
    );
};

export default DrawerRedNavs;