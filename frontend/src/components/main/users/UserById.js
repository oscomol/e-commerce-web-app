import { Tr, Td, Button, ButtonGroup, Text } from '@chakra-ui/react';
import ModalCont from '../../common/ModalContent';
import { useHandleBlockUserMutation } from '../../api/slices/userSlice';
import { getOrder } from '../../api/slices/authSliceData';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const UserById = ({ user, role }) => {
    const [isBlocked, { isLoading }] = useHandleBlockUserMutation();
    const orders = useSelector(getOrder);
    const [userOrder, setUserOrder] = useState([]);
    const {id} = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (orders?.length && user?.id) {
            const order = orders.filter(list => list.userID === user.id);
            if (order?.length) {
                setUserOrder(order)
                console.log(order)
            }
        }

        return () => {
            setUserOrder([]);
        }
    }, [orders, user?.id]);

    const handleBlock = async (onClose) => {
        try {
            const initialData = { id: user.id, isBlock: user.isBlock === 0 ? 1 : 0 };
            await isBlocked(initialData).unwrap();
        } catch (err) {
            console.log(err)
        } finally {
            onClose()
        }
    }

    const handleUserOrder = (id) => {
        navigate(`order/${id}`)
    }

    return (
        <>
            {
                user.role === role ?
                    <Tr>
                        <Td>{user.firstname + " " + user.lastname + ", " + user.middlename[0].toUpperCase() + "."}</Td>
                        <Td>{user.phone}</Td>
                        <Td >{user.gmail}</Td>
                        <Td >{user.bday}</Td>
                        <Td>
                            <ButtonGroup>
                                {role === 2 &&  <Button size='sm' colorScheme='green' variant="ghost" isDisabled={!userOrder?.length} onClick={()=>handleUserOrder(user?.id)}>Orders</Button>}
                                <ModalCont
                                    btn={(onOpen) => (
                                        <Button size='sm' colorScheme='red' variant="ghost" onClick={onOpen} isDisabled={role === 1 && user.id === id}>{user.isBlock === 0 ? "Unblock" : "Block"}</Button>
                                    )}
                                    body={(onClose) => (
                                        <Text>Are you sure to {user.isBlock === 0 ? "unblock" : "block"} {user.firstname + " " + user.lastname + ", " + user.middlename[0].toUpperCase() + ". ?"}</Text>
                                    )}
                                    title={user.isBlock === 0 ? "Unblock user" : "Block user"}
                                    size="sm"
                                    footer={(onClose) => (
                                        <>
                                            <Button size="sm" variant='ghost' colorScheme='green' float='left' mr='10px' onClick={() => handleBlock(onClose)} isDisabled={isLoading}>Yes</Button>
                                            <Button size="sm" variant='ghost' colorScheme='red' float='left' onClick={onClose} isDisabled={isLoading}>No</Button>
                                        </>
                                    )}
                                    footerP="3px"
                                />
                            </ButtonGroup>
                        </Td>
                    </Tr> : null
            }
        </>
    );
};

export default UserById;