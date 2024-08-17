import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Main from '../Main';
import { Badge, Box, Tr, Th, Td, Button, Flex } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { selectAllUser } from '../../api/slices/userSlice';
import { getOrder } from '../../api/slices/authSliceData';
import TableCont from '../../common/TableCont';
import UserOrderFees from './UserOrderFees';
import ModalCont from '../../common/ModalContent';
import UserOrderBody from './UserOrderBody';

const UserOrders = () => {
    const { userID } = useParams();
    const users = useSelector(selectAllUser);
    const orders = useSelector(getOrder);
    const [user, setUser] = useState({});
    const [order, setOrder] = useState([]);

    useEffect(() => {
        if (users?.length) {
            const user = users.find(list => list.id === userID * 1);
            setUser(user)
        }

        return () => {
            setUser({});
        }
    }, [userID, users]);

    useEffect(() => {
        if (orders?.length) {
            const order = orders.filter(list => list.userID === userID * 1);
            setOrder(order)
        }

        return () => {
            setOrder([]);
        }
    }, [orders, userID])

    const checkStat = (stat) => {
        if (stat === 1) {
            return { label: 'Pending', color: 'teal' }
        } else if (stat === 2) {
            return { label: 'Delivered', color: 'blue' }
        } else if (stat === 3) {
            return { label: 'Cancelled', color: 'red' }
        } else if (stat === 4) {
            return { label: 'Completed', color: 'green' }
        } else if (stat === 5) {
            return { label: 'Rated', color: 'orange' }
        }
    }

    return (
        <>
            <Main
                title="Users"
            />
            {(user && orders?.length) && <Box p='30px'>
                <Badge fontSize='xxl' bg='none' mb='20px'>Orders made by {user.firstname + " " + user.lastname}</Badge>

                <Flex p='15px' borderRadius='md' bg='lightgray' justify='center' align='center'>
                    <TableCont
                        head={<Tr>
                            <Th>Tracking ID</Th>
                            <Th>No of Items</Th>
                            <Th>Total Fees</Th>
                            <Th>Status</Th>
                            <Th>Action</Th>
                        </Tr>}
                        body={<>
                            {order.map(list => (
                                <Tr key={list.id}>
                                    <Td>{list.trackingID}</Td>
                                    <Td>{list.products.length}</Td>
                                    <UserOrderFees product={list.products} sf={list.shippingFee} />
                                    <Td><Badge colorScheme={checkStat(list.status).color}>{checkStat(list.status).label}</Badge></Td>
                                    <ModalCont
                                        btn={(onOpen) => (
                                            <Td onClick={onOpen}>
                                                <Button variant="ghost" colorScheme='green' size="sm">View more</Button>
                                            </Td>
                                        )}
                                        body={(onClose) => (
                                            <UserOrderBody
                                                user={user}
                                                status={checkStat(list.status)}
                                                products={list.products}
                                                sf={list.shippingFee}
                                            />
                                        )}
                                        title={`Tracking ID: ${list.trackingID}`}
                                        size="md"
                                    />
                                </Tr>
                            ))}
                        </>}
                        size='sm'
                    />
                </Flex>
            </Box>}
        </>
    )
};

export default UserOrders;