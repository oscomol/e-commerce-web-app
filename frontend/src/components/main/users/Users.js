import { Box, HStack, Text, Input, InputGroup, InputRightElement, Button, Badge } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

import Main from "../Main";
import UserContent from "./UserContent";

const Users = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const mouseLeave = () => {
        setIsSearchOpen(false);
    }

    let content;
    if (isSearchOpen) {
        content = <InputGroup size='sm'>
            <Input
                pr='4.5rem'
                placeholder='Search item here'
                autoFocus
                onMouseLeave={mouseLeave}
                focusBorderColor='lightgray'
            />
            <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' mr='-30px'>
                    <FaSearch />
                </Button>
            </InputRightElement>
        </InputGroup>
    } else {
        content = <Text onClick={() => setIsSearchOpen(true)}><FaSearch /></Text>
    }


    return (
        <>
            <Main
                title="Users"
                otherBtn={<HStack>
                    {content}
                </HStack>}
            />
            <Box p='30px'>
                <Badge fontSize='xxl' bg='none' mb='20px'>Active users</Badge>
                <UserContent />
            </Box>
        </>
    );
};

export default Users;