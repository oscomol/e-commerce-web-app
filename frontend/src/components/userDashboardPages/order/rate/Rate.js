import NoOrder from '../NoOrder';
import Main from '../../../main/Main';
import CommonContOrders from '../common/CommonContOrders';
import { Tr, Th, Td, Img, Flex, HStack, Button, Text } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';

const Rate = () => {
    const rate = [
        {
            id: 1,
            orderID: '018171',
            price: 800,
            shippingFee: 120,
            date: '01-22-98',
            deliveryDate: '01-22-98',
            rate: 4
        },
        {
            id: 2,
            orderID: '018171',
            price: 800,
            shippingFee: 120,
            date: '01-22-98',
            deliveryDate: '01-22-98',
        },
        {
            id: 3,
            orderID: '018171',
            price: 800,
            shippingFee: 120,
            date: '01-22-98',
            deliveryDate: '01-22-98',
            rate: 5
        }
    ];

    return (
        <>
            <Main />
            {rate.length ?
                <CommonContOrders
                    title='Rate Orders'
                    head={<Tr>
                        <Th>Item/s</Th>
                        <Th>Order ID</Th>
                        <Th>Date recieved</Th>
                        <Th>Cost</Th>
                        <Th>Rate</Th>
                    </Tr>}
                    body={rate.map(order => (
                        <Tr>
                            <Td>
                                <Flex gap='10px'>
                                    <Img src="../photos/shoes.jfif" w='50px' h='50px' />
                                    <Img src="../photos/shoes.jfif" w='50px' h='50px' />
                                </Flex>
                            </Td>
                            <Td>
                                {order.orderID}
                            </Td>
                            <Td>
                                {order.date}
                            </Td>
                            <Td>
                                {order.shippingFee + order.price}
                            </Td>
                            <Td>
                                {order.rate ? 
                                <HStack gap='5px'>
                                   <Text color={order.rate >= 1 ? 'orange':'lightgray'}><FaStar/></Text>
                                   <Text color={order.rate >= 2 ? 'orange':'lightgray'}><FaStar/></Text>
                                   <Text color={order.rate >= 3 ? 'orange':'lightgray'}><FaStar/></Text>
                                   <Text color={order.rate >= 4 ? 'orange':'lightgray'}><FaStar/></Text>
                                   <Text color={order.rate >= 5 ? 'orange':'lightgray'}><FaStar/></Text>
                                </HStack>:<Button colorScheme='orange' size='sm'>Rate now</Button>}
                            </Td>
                        </Tr>
                    ))}
                /> :
                <NoOrder />
            }
        </>
    );
};

export default Rate;