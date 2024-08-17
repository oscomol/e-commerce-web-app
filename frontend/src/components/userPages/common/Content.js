import { Heading, Box, Text } from '@chakra-ui/react';
import React from 'react';
import useGetScroll from '../../../hooks/useGetScroll';

const Content = ({about}) => {
    const scroll = useGetScroll();

    return (
        <Box bg='RGBA(0, 0, 0, 0.08)' p='15px' borderRadius='md' mb='50px' boxShadow='0px 4px 6px rgba(0, 0, 0, 0.5)'>
            <Heading size='md' pb='10px'>{about.header}</Heading>
            <Text>
               {about.body}
            </Text>
        </Box>
    );
};

export default Content;