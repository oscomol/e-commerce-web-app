import { Flex, Heading, Box, Text, Input, Textarea, Button, useMediaQuery } from '@chakra-ui/react';

const Form = () => {
    const [isMax750] = useMediaQuery('(max-width: 750px)');

    return (
        <Flex flexDir={isMax750 ? 'column':'row'} justify={isMax750 ? 'flex-start':'space-between'} gap={isMax750 ? '15px':0} align='flex-start' mt='50px'>
            <Box w={isMax750 ? '100%':'48%'}>
                <Heading color='orange'>Message us</Heading>
                <Text as='p' mt={isMax750 ? '20px':'30px'}>
                    If you want to be considered for employment at COMPANY NAME, please do not sent a message, here-instead, please complete COMPANY NAME's job application and out Human Resources department will contact you after thie review of your submitted information.
                </Text>
            </Box>
            <Box w={isMax750 ? '100%':'48%'}>
                <Flex flexDirection='column' gap='15px'>
                    <Box>
                        <Text mb='5px'>Name</Text>
                        <Input type='text' border='1px solid orange'/>
                    </Box>
                    <Box>
                        <Text mb='5px'>Gmail</Text>
                        <Input type='text' border='1px solid orange'/>
                    </Box>
                    <Box>
                        <Text mb='5px'>Comment</Text>
                        <Textarea border='1px solid orange' h='120px'/>
                    </Box>
                    <Flex w='100%' justify='flex-end' gap='10px'>
                        <Button colorScheme='blue'>Submit</Button>
                        <Button colorScheme='red'>Clear</Button>
                    </Flex>
                </Flex>
            </Box>
        </Flex>
    );
};

export default Form;