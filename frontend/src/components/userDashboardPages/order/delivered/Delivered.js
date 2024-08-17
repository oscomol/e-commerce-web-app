import NoOrder from '../NoOrder';
import Main from '../../../main/Main';
import CommonContOrders from '../common/CommonContOrders';
import { Tr, Th, Tbody, Td, useMediaQuery, GridItem, Grid } from '@chakra-ui/react';
import useFilterOrder from '../../../../hooks/useFilterOrder';
import OrderById from './OrderById';
import { useEffect, useState } from 'react';
import PendingMobile from '../pending/PendingMobile';

const Delivered = () => {
    const [isMax800, isMax650] = useMediaQuery(['(max-width: 800px)', '(max-width: 650px)']);
    const delivered = useFilterOrder(2)
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(false);
    }, [delivered]);

    let content;
    if(delivered?.length){
        if (isMax800) {
           content = <Grid templateColumns={`repeat(${isMax650 ? '1' : '2'}, 1fr)`}>
           {delivered.map(order => (
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
        }else{
            content = <CommonContOrders
            title='Delivered Orders'
            head={<Tr>
                <Th>Item/s</Th>
                <Th>Order ID</Th>
                <Th>Order date</Th>
                <Th>Delivery attempt</Th>
                <Th>Cost</Th>
                <Th>Action</Th>
            </Tr>}
            body={delivered.map(order => (
               <OrderById key={order.id} order={order} isLoading={isLoading} setIsLoading={setIsLoading}/>
            ))}
        />
        }
    }else{
        content = <NoOrder />
    }

    return (
        <>
            <Main />
            {content}
        </>
    );
};

export default Delivered;