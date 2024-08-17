import { Badge, Flex, Img } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { selectAllOrder } from '../../api/users/orderSlice';

const NoProduct = () => {

    return (
        <Flex w='100%' flexDir='column' align='center' mt='120px'>
            <Img src='/photos/order/noProduct.webp' w='150px' h='150px' />
            <Badge fontSize='x-large' bg='none'>No product to show</Badge>
        </Flex>
    );
};

export default NoProduct;