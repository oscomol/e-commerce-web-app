import React, { useState } from 'react';
import { Box, HStack, Text, Input, InputGroup, InputRightElement, Button, Badge } from "@chakra-ui/react";
import { FaPlus, FaSearch } from "react-icons/fa";

import Main from '../Main';
import ModalCont from '../../common/ModalContent';
import AdminContent from './AdminContent';
import SignUp from '../../userPages/signup/SignUp';

const Admins = () => {
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
                title="Products"
                otherBtn={
                    <HStack gap='5'>
                        {content}
                        <ModalCont
                            btn={(onOpen) => (
                                <Text onClick={onOpen}><FaPlus /></Text>
                            )}
                            size="lg"
                            title="Add a New Administrator"
                            footer={(onClose) => (
                                <>
                                </>
                            )}
                            body={(onClose) => (
                                <SignUp w='100%' onClose={onClose} />
                            )}
                        />
                        
                    </HStack>
                }
            />
            <Box p='30px'>
                <Badge fontSize='xxl' bg='none' mb='20px'>Administrators</Badge>
                <AdminContent />
            </Box>
        </>
    );
};

export default Admins;