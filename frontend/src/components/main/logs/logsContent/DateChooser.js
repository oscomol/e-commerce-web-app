import { Box, HStack, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react';


const DateChooser = () => {
    return (
        <Box>
            <InputGroup size='sm' border='1px solid lightgray'>
            <InputLeftAddon>
                Selected date:
            </InputLeftAddon>
            <Input type='date' />
        </InputGroup>
        </Box>
    );
};

export default DateChooser;