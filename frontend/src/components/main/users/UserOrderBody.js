import { Badge, Box, Flex, Img, NumberIncrementStepper, NumberInput, NumberInputField, NumberDecrementStepper, NumberInputStepper, Text, Spacer } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllproduct } from '../../api/slices/productSlice';

const UserOrderBody = ({ user, products, status, sf }) => {
    const product = useSelector(selectAllproduct);
    const [orderedProduct, setOrderedProduct] = useState([]);
    const [totalPrice, setTotalPrice] = useState('');

    useEffect(() => {
        if (product?.length) {
            const findProduct = products.map(data => {
                const getProduct = product.find(list => list.id === data.productID);
                if (!getProduct) return;
                return { filename: getProduct.filename, brand: getProduct.brand, description: getProduct.description, price: data.price, quantity: data.quantity, discountedPrice: getProduct.discountedPrice, total: data.price * data.quantity }
            })
            setOrderedProduct(findProduct);
            const totalPrice = findProduct.map(data => data.total);
            setTotalPrice(totalPrice?.length > 1 ? totalPrice.reduce((p1, p2) => p1 + p2) : totalPrice[0])
        }

        return () => {
            setOrderedProduct([]);
            setTotalPrice('');
        }
    }, [products?.length, product])

    let content;
    if (orderedProduct?.length) {
        content = orderedProduct.map(data => (
            <Flex gap='15px' mb='20px' p='15px' borderBottom='1px solid lightgray'>
                <Box>
                    <Img src={`http://localhost:3500/product/${data?.filename}`} w='100px' h='93px' />
                </Box>
                <Flex flexDir='column' lineHeight='20px' align='flex-start'>
                    <Badge bg='none' fontSize='lg' p='0'>{data.brand}</Badge>
                    <Text>{data?.description?.length > 21 ? data.description.slice(0, 21) + '...' : data.description}</Text>
                    <Badge colorScheme='red'>{data.price}</Badge>
                    <Flex w='100%'>
                        <Badge colorScheme='white'>quantity</Badge>
                        <Spacer/>
                        <Badge colorScheme='green'>{data.quantity}</Badge>
                    </Flex>
                </Flex>
            </Flex>
        ))
    }

    return (
        <>
            <Badge colorScheme={status.color} w='100%' p='10px' textAlign='center'>{status.label}</Badge>
            {user.id && <Box p='15px' borderBottom='1px solid lightgray' mb='20px' lineHeight='20px'>
                <Badge p='0' bg='none'>recepient</Badge>
                <Text mt='-5px'>{user.lastname + ", " + user.firstname + " " + user.middlename[0].toUpperCase() + "."}</Text>
                <Text>Block {user.blockNo}, {user.sitio}, Barangay {user.barangay},</Text>
                <Text>{user.city} City, {user.province}</Text>
                <Text>{user.gmail}</Text>
                <Text>{user.phone}</Text>
            </Box>}
            {content}
            <Box p='15px' borderBottom='1px solid lightgray' mb='20px' lineHeight='20px'>
                <Badge bg='none' w='100%'>Shipping Fee <Text as="span" float='right' mr='10px'>{sf}</Text></Badge>
                <Badge bg='none' w='100%'>Shipping Method <Text as="span" float='right' mr='10px'>COD</Text></Badge>
            </Box>
            <Flex w='100%' mt='30px' p='10px 20px 10px 10px' justify='flex-end' gap='20px' align='center'>
                <Badge colorScheme="red" fontSize='lg'>Php {totalPrice + sf}.00</Badge>
            </Flex>
        </>
    );
};

export default UserOrderBody;