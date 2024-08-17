import { Badge, Box, Flex } from '@chakra-ui/react';
import React from 'react';

const Section = ({ title, body, rightBtn }) => {
    return (
        <Box>
            <Flex align='center' justify='space-between' mb='5px'>
                <Badge bg='none' fontSize='sm'>{title}</Badge>
                {rightBtn && rightBtn}
            </Flex>
            {body && body}
        </Box>
    );
};

export default Section;