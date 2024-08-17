import { FaLockOpen } from "react-icons/fa";
import { useLoginMutation } from "../../api/slices/authApiSlice";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../api/slices/authSliceData";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { Input, Flex, InputRightElement, Text, Box, InputGroup, InputLeftElement, Badge, Button, useMediaQuery, useToast } from '@chakra-ui/react';

import { socket } from "../../../socket/socket";

import { FaUser, FaLock, FaEyeSlash, FaEye } from 'react-icons/fa';

const UserLogin = () => {
    const [showPass, setShowPass] = useState(false);
    const [isMax570, isMax700, isMax820, isMax1000] = useMediaQuery(['(max-width: 570px)', '(max-width: 700px)', '(max-width: 820px)', '(max-width: 1000px)']);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState(""); 

    const [login, { isLoading }] = useLoginMutation();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const toast = useToast();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const initialData = { username, password };
            const res = await login(initialData).unwrap();
            if (res) {
                dispatch(setCredentials(res.accesToken))
                const user = jwtDecode(res.accesToken)
                // socket.connect();
                navigate(user?.userinfo?.role === 1 ? '/admin' : '/dashboard');
            }
        } catch (err) {
            toast({
                title: "Login error",
                description: err?.data?.msg,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }

    return (
        
            <form onSubmit={handleLogin}>
                <Flex w='100%' h='100vh' justify='center' align='center'>
                <Flex w={isMax570 ? '75%' : isMax700 ? '65%' : isMax820 ? '55%' : isMax1000 ? '45%' : '40%'} p='30px' borderRadius='md' justify='center' align='center' flexDir='column' marginInline='auto' gap='10px' boxShadow='rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px;'>
                    <Flex w='100%' flexDir='column' gap='4px' align='center' mb='30px'>
                        <Box
                            w='60px'
                            h='60px'
                            borderRadius='50%'
                            bg='teal'
                        />
                        <Badge fontSize='x-large' bg='none' color='black'>TITLE TEXT</Badge>
                        <Text>Shop The Future</ Text>
                    </Flex>
                    <Box w='100%'>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <FaUser color='gray.300' />
                            </InputLeftElement>
                            <Input type='text' value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter username" border='1px solid teal' />
                        </InputGroup>
                    </Box>
                    <Box w='100%'>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <FaLock color='gray.300' />
                            </InputLeftElement>
                            <Input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password"  border='1px solid teal' />
                            <InputRightElement>
                                <Text color='gray' onClick={() => setShowPass(!showPass)}>{showPass ? <FaEyeSlash /> : <FaEye />}</Text>
                            </InputRightElement>
                        </InputGroup>
                    </Box>
                    <Box w='100%'>
                        <Button type="submit" leftIcon={<FaLockOpen />} colorScheme='green' w='100%' isDisabled={isLoading || !username || !password}>{isLoading ? 'Please wait':'Sign in'}</Button>
                    </Box>
                </Flex>
                </Flex>
            </form>
    );
};

export default UserLogin;
