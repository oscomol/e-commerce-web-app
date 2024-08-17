import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';

const Login = ({username, setUsername, password, setPassword}) => {

    return (
        <Flex>
            <Box>
                <Text  color='black'>Username</Text>
                
            </Box>
            <Box>
                <Text>Password</Text>
                
            </Box>
        </Flex>
    );
};

export default Login;