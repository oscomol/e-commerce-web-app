import { Flex, Text, Badge } from "@chakra-ui/react";

const Icons = ({ icon, label }) => {
    return (
        <Flex align='center' flexDir='column' gap='5px'>
            <Flex w='50px' h='50px' bg='orange' borderRadius='50%' justify='center' align='center'>
                <Text color='white' fontSize='x-large'>{icon}</Text>
            </Flex>
            <Badge bg='none' color='gray' fontSize='md'>{label}</Badge>
        </Flex>
    );
};

export default Icons;