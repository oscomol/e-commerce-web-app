import {
    Flex, Text, Button, VStack, Badge, Table,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    HStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { socket } from '../../../../socket/socket';
import useAuth from '../../../../hooks/useAuth';
import OrderProductById from '../OrderProductById';
import ShowOrder from '../ShowOrder';
import MessageThisOrder from '../common/MessageThisOrder';

const PendingMobile = ({ order, body }) => {
    const [price, setPrice] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useAuth();

    useEffect(() => {
        if (price?.length > 0) {
            setTotalPrice(price.length > 1 ? price.reduce((p1, p2) => p1 + p2) : price[0]);
        }

        return () => {
            setTotalPrice(0);
        }
    }, [price.length]);

    const handleCancel = async (onClose) => {
        try {
            setIsLoading(true);
            const orderID = order.products[0].orderID;
            await socket.emit('orderUpdate', ({ id: orderID, status: 3, userID: id }));
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
            onClose();
        }
    };

    return (
        <Flex borderBottom='1px solid lightgray' p='20px' gap='10px' overflow='hidden'>
            <VStack>
                <Flex gap='10px' flexDir='column' overflow='hidden'>
                    {order.products.map((product, index) => (
                        <OrderProductById key={index} product={{ ...product, index: index + 1 }} setPrice={setPrice} size='70px' />
                    ))}
                </Flex>
                <Text alignSelf='flex-end'>{order?.products?.length > 2 && `+${order.products.length - 2}`}</Text>
            </VStack>
            <TableContainer overflow='hidden'>
                <Table variant='simple' size='sm'>
                    <TableCaption>
                        <HStack>
                            <ShowOrder
                                checkedList={order?.products}
                                shippingMethod={order.shippingMethod}
                                trackingID={order.trackingID}
                                tag={{ label: "Delivery attempt 1 to 2 days from now", color: 'teal' }}
                                footerBtn={(onClose) => (
                                    <Button size='sm' variant='outline' colorScheme='red' onClick={() => handleCancel(onClose)} isDisabled={isLoading}>{isLoading ? 'Cancelling...' : 'Cancel'}</Button>
                                )}
                            />
                            <MessageThisOrder order={order} />
                        </HStack>
                    </TableCaption>
                    {body(totalPrice)}
                </Table>
            </TableContainer>
        </Flex>
    );
};

export default PendingMobile;
