import NoOrder from '../NoOrder';
import Main from '../../../main/Main';
import CommonContOrders from '../common/CommonContOrders';
import { Flex, useMediaQuery, Box, Grid, GridItem, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import PendingMobile from './PendingMobile';
import OrderById from './OrderById';
import useFilterOrder from '../../../../hooks/useFilterOrder';
import { useEffect, useState } from 'react';

const Pending = () => {
    const [isMax800, isMax650] = useMediaQuery(['(max-width: 800px)', '(max-width: 650px)']);
    const pending = useFilterOrder(1);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(false);
    }, [pending]);

    let content;
    if (pending.length) {
        if (isMax800) {
            content = <Grid templateColumns={`repeat(${isMax650 ? '1' : '2'}, 1fr)`}>
                {pending.map(order => (
                    <GridItem key={order.id}>
                        <PendingMobile key={order.id} order={order} isLoading={isLoading} setIsLoading={setIsLoading}
                            body={(totalPrice) => (
                                <Tbody>
                                    <Tr>
                                        <Th>Tracking ID</Th>
                                        <Td>{order.trackingID}</Td>
                                    </Tr>
                                    <Tr>
                                        <Th>Order date</Th>
                                        <Td>{order.dateOrdered}</Td>
                                    </Tr>
                                    <Tr>
                                        <Th>Product total</Th>
                                        <Td>{totalPrice}</Td>
                                    </Tr>
                                    <Tr>
                                        <Th>Shipping Fee</Th>
                                        <Td>{order.shippingFee}</Td>
                                    </Tr>
                                    <Tr>
                                        <Th>Total cost</Th>
                                        <Td>{totalPrice + order.shippingFee}</Td>
                                    </Tr>
                                </Tbody>
                            )}
                        />
                    </GridItem>
                ))}
            </Grid>
        } else {
            content = <Box p='30px'>
                <CommonContOrders
                    title='Pending Orders'
                    head={<Tr>
                        <Th>Item/s</Th>
                        <Th>Order ID</Th>
                        <Th>Order date</Th>
                        <Th>Price</Th>
                        <Th>Shipping fee</Th>
                        <Th>Cost</Th>
                        <Th>Action</Th>
                    </Tr>}
                    body={pending.map(order => (
                        <OrderById key={order.id} order={order} isLoading={isLoading} setIsLoading={setIsLoading} />
                    ))}
                />
            </Box>
        }
    } else {
        content = <NoOrder />
    }

    return (
        <>
            <Main />
            {content}
        </>
    );
};

export default Pending;