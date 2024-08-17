import { InputRightAddon, Input, InputGroup, InputLeftAddon, } from '@chakra-ui/react';

const AdditionalExpense = ({dir, isMax600}) => {
    return (
        <InputGroup size='sm' border='1px solid lightgray' borderRadius='mb' w={isMax600 ? '100%':(dir === 'column') ? '50%':'100%'}>
            <InputLeftAddon>
                Php:
            </InputLeftAddon>
            <Input type='number' placeholder='00'/>
            <InputRightAddon>
                .00
            </InputRightAddon>
        </InputGroup>
    );
};

export default AdditionalExpense;