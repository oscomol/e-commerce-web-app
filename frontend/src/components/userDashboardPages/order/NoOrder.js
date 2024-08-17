import { Badge, Flex, Img } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { selectAllOrder } from '../../api/users/orderSlice';
import { useEffect } from 'react';

const NoOrder = () => {
    const orders = useSelector(selectAllOrder);

    return (
        <Flex w='100%' flexDir='column' align='center' gap='10px' mt='120px'>
            <Img src='/photos/order/noOrder.png' w='150px' h='150px' />
            <Badge fontSize='x-large' bg='none'>No order yet</Badge>
        </Flex>
    );
};

export default NoOrder;