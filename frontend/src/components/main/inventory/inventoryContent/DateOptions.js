import { HStack, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react';

const DateOptions = ({from, setFrom, to, setTo}) => {

    return (
        <HStack>
            <InputGroup size='sm' border='1px solid lightgray'  borderRadius='md'>
                <InputLeftAddon>
                   From: 
                </InputLeftAddon>
                <Input type='date' value={from} onChange={(e) => setFrom(e.target.value)}/>
            </InputGroup>
            <InputGroup size='sm' border='1px solid lightgray' borderRadius='md'>
                <InputLeftAddon>
                   To: 
                </InputLeftAddon>
                <Input type='date' value={to} onChange={(e) => setTo(e.target.value)} />
            </InputGroup>
        </HStack>
    );
};

export default DateOptions;