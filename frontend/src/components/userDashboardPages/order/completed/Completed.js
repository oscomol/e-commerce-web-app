import NoOrder from '../NoOrder';
import Main from '../../../main/Main';
import CommonContOrders from '../common/CommonContOrders';
import { Tr, Th, Tbody, Td, GridItem, Grid, useMediaQuery } from '@chakra-ui/react';
import useFilterOrder from '../../../../hooks/useFilterOrder';
import OrderById from './OrderById';
import PendingMobile from '../pending/PendingMobile';

const Completed = () => {
    const [isMax800, isMax650] = useMediaQuery(['(max-width: 800px)', '(max-width: 650px)']);
    const completed = useFilterOrder(4, true);

    let content;
    if (completed?.length) {
        if (isMax800) {
            content = <Grid templateColumns={`repeat(${isMax650 ? '1' : '2'}, 1fr)`}>
                {completed.map(order => (
                    <GridItem key={order.id}>
                        <PendingMobile key={order.id} order={order}
                            body={(totalPrice) => (
                                <Tbody>
                                    <Tr>
                                        <Th>Tracking ID</Th>
                                        <Td>{order.trackingID}</Td>
                                    </Tr>
                                    <Tr>
                                        <Th>Recieved date</Th>
                                        <Td>{order.recievedDate}</Td>
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
            content = <CommonContOrders
                title='Completed orders'
                head={<Tr>
                    <Th>Item/s</Th>
                    <Th>Order ID</Th>
                    <Th>Recieved date</Th>
                    <Th>Cost</Th>
                    <Th>Action</Th>
                </Tr>}
                body={completed.map(order => (
                    <OrderById key={order.id} order={order} />
                ))}
            />
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

export default Completed;