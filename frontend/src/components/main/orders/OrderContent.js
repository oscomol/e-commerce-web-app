import {
    Tr,
    Th,
    Td,
    Badge,
    ButtonGroup,
    Button,
    Box,
    Text,
    Center
} from '@chakra-ui/react'
import TableCont from '../../common/TableCont';
import { useSelector } from 'react-redux';
import { getOrder } from '../../api/slices/authSliceData';
import OrderById from './OrderById';
import { useEffect, useState } from 'react';

const OrderContent = ({ dashDis, status }) => {
    const orders = useSelector(getOrder);
    const [toDisplay, setToDisplay] = useState([]);


    const sliceOrder = (data) => {
        const newData = data.slice(0, 5);
        return newData;
    }

    const reversing = (arrData) => {
        let reversedArr = [];

        for(let x=0; x<arrData.length; x++){
            reversedArr.unshift(arrData[x]);
        }

        return reversedArr;
    }

    useEffect(() => {
        let newArrData = [];
        if (dashDis) {
            const pending = orders.filter(order => order.status === 1);
            newArrData = pending?.length > 5 ? sliceOrder(pending) : pending
        } else {
            if (status === 0) {
                newArrData = orders
            } else {
                newArrData = orders.filter(order => order.status === status)
            }
        }

        setToDisplay(reversing(newArrData))

        return () => {
            newArrData = [];
            setToDisplay([]);
        }
    }, [dashDis, orders, status]);

    let content;

    if (toDisplay?.length) {
        content = <Box>
            <TableCont
                head={<Tr>
                    <Th>Order ID</Th>
                    <Th>No. of items</Th>
                    <Th >Date</Th>
                    <Th >Status</Th>
                    <Th >Payment</Th>
                    <Th>Action</Th>
                </Tr>}
                body={toDisplay.map(order => (
                    <OrderById key={order.id} order={order} dashDis={dashDis} />
                ))}
                size='sm'
            />
        </Box>
    } else {
        content = <Center><Text>No orders to show in that status!</Text></Center>
    }

    return content;
};

export default OrderContent;