import { Img, Flex, Heading, Spacer, useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import Navigation from './Navigation';
import DrawerNavs from './DrawerNavs';
import useGetWidth from '../../../../hooks/useGetWidth';

const Header = ({pad}) => {
    const [isMax770] = useMediaQuery('(max-width: 770px)');

    const w = useGetWidth();

    return (
        <Flex
            position='fixed'
            color='alpha.500'
            align='center'
            w='100%'
            h='10vh'
            p={`10px ${pad} 10px ${pad}`}
            bg='white'
            boxShadow='0px 4px 6px rgba(0, 0, 0, 0.1)'
            zIndex={999}
        >
            {isMax770 && <DrawerNavs />}
            <Heading color='orange'>
                <Img src="photos/mainLogo.png" width="50px" height="50px"/>
            </Heading>
            <Spacer />
            <Navigation />
        </Flex>
    );
};

export default Header;
