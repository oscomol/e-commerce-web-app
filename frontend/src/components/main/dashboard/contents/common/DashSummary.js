import { Flex, Spacer, Text, useMediaQuery } from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";

const DashSummary = ({icon, color, title, data, helperText}) => {
    const [isMax700] = useMediaQuery('(max-width: 700px)');


    return (
        <Flex p='15px' direction='column' bg='lightgray' borderRadius='10px'>
            <Flex gap={isMax700 ? 4:7} align='center'>
                <Flex w='40px' h='40px' borderRadius='50%' bg={color} align='center' justify='center'>
                <Text fontWeight='bold' fontSize='20px'>
                    {icon}
                </Text>
                </Flex>
                <Flex direction='column'>
                    <Text >{title}</Text>
                    <Text fontWeight='bold' fontSize='20px'>{data}</Text>
                </Flex>
            </Flex>
            <Flex ml='68px' align='center'>
                <Text fontSize='12px'>{helperText ?? ""}</Text>
            </Flex>
        </Flex>
    );
};

export default DashSummary;