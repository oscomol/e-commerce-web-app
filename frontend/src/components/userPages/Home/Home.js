import { Heading, Stack, Flex, Text, HStack, Box, ScaleFade, useMediaQuery } from '@chakra-ui/react';
import { FaFacebook, FaInstagram, FaTwitter, FaYahoo } from 'react-icons/fa';
import { useState, useEffect } from 'react';

import RandomPhoto from './RandomPhoto';

const Home = () => {
    const [isMax900, isMax1080] = useMediaQuery(['(max-width: 900px)', '(max-width: 1080px)']);
    const [showLogo, setShowLogo] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowLogo(true);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, []);

    const btns = {
        w:'40px',
        h:'40px',
        borderRadius:'50%',
        justifyContent:'center',
        alignItems:'center',
        border:'2px solid gray',
        _hover:{bg: 'orange', color: 'white', border: 'none'}
    }

    const txt = {
        fontSize:'xl', 
        color:'alpha.500'
    }

    return (
        <ScaleFade in={showLogo} initialScale={0.9}>
            <Box w='100%' h='90vh' pt='50px' pb='20px'>
                <Flex justifyContent={isMax900 ? 'center' : 'space-between'} h='83vh' pb='10px'>
                    <Flex w={isMax900 ? '100%' : '45%'} h='100%' justify={isMax900 ? 'flex-start' : 'flex-end'} flexDir='column' mt='20px'>
                        {isMax900 && <Flex mb='40px'>
                            <RandomPhoto c={0} />
                            <RandomPhoto c={3} />
                        </Flex>}
                        <Text color='orange' fontSize={isMax1080 ? '50px' : '60px'} lineHeight={isMax1080 ? '60px' : '80px'} fontWeight='bold'>Shop the Future<br></br> Now Online</Text>
                        <Stack spacing='3'>
                            <Heading size='md'>Explore our curated collection of cutting-edge products</Heading>
                            <Text>
                            Discover the Future of Innovation – Handpicked for Exceptional Quality, Unmatched Performance, and Designed to Elevate Your Everyday Experience
                            </Text>
                        </Stack>
                        <HStack mt='30px' gap={5} pb='15px'>
                            <Flex sx={btns}>
                                <Text sx={txt}><FaFacebook /></Text>
                            </Flex>
                            <Flex sx={btns}>
                                <Text sx={txt}><FaTwitter /></Text>
                            </Flex>
                            <Flex sx={btns}>
                                <Text sx={txt}><FaInstagram /></Text>
                            </Flex>
                            <Flex sx={btns}>
                                <Text sx={txt}><FaYahoo /></Text>
                            </Flex>
                        </HStack>
                    </Flex>
                    {!isMax900 && <RandomPhoto c={3} />}
                </Flex>
            </Box>
        </ScaleFade>
    );
};

export default Home;