import { Box, Text } from '@chakra-ui/react';
import React from 'react';

const ContactList = ({data}) => {
    return (
        <Box textAlign='center'>
            <Text fontWeight='bold'>{data.building}</Text>
            {data.place.map(place => (
                <Text as='p'>{place}</Text>
            ))}
        </Box>
    );
};

export default ContactList;