import { Tr, Td, ButtonGroup, Button, Badge, Textarea } from "@chakra-ui/react";
import ShowOrder from "../../userDashboardPages/order/ShowOrder";
import useAuth from "../../../hooks/useAuth";
import { socket } from "../../../socket/socket";
import { useState } from "react";
import ModalCont from "../../common/ModalContent";

const OrderById = ({ order, dashDis }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isUserFound, setFound] = useState(false);
    const { id, role } = useAuth();
    const [message, setMessage] = useState('');


    const handleCancel = async () => {
        setIsLoading(true);
        const adminData = { id, event: "Cancelled an order: " + order.trackingID };
        const data = { userID: order.userID, status: 3, adminID: id, id: order.id, logs: adminData }
        await socket.emit('adminUpdateOrder', data);
        setIsLoading(false);
    }

    const handleConfirm = async (onClose, status) => {
        setIsLoading(true);
        let event = '';
        if (status === 2) {
            event = "Confirm an order: " + order.trackingID;
        } else if (status === 3) {
            event = "Cancelled an order: " + order.trackingID;
        } else {
            event = "Mark an order completed: " + order.trackingID;
        }
        const adminData = { id, event };
        const data = { userID: order.userID, status, adminID: id, id: order.id, logs: adminData }
        await socket.emit('adminUpdateOrder', data);
        onClose();
        setIsLoading(false);
    }

    const checkOrderStat = (stat) => {
        let statLabel = {};
        if (stat === 1) {
            statLabel = { label: "Pending Order", color: 'teal' }
        } else {
            if (stat === 2) {
                statLabel = { label: "Delivered Order", color: 'blue' }
            } else {
                if (stat === 3) {
                    statLabel = { label: "Cancelled Order", color: 'red' }
                } else {
                    if (stat === 4) {
                        statLabel = { label: "Completed Order", color: 'green' }
                    } else {
                        statLabel = { label: "To Rate", color: 'orange' }
                    }
                }
            }
        }

        return statLabel;
    }

    const sendMsg = async (orderID, onClose, userID) => {
        const initialData = { sender: id, message, access: userID + '-A', role, reciever: userID, orderID};
       
        await socket.emit('newMessage', initialData);
        onClose()
    }

    return (
        <Tr>
            <Td>{order.trackingID}</Td>
            <Td >{order.products?.length}</Td>
            <Td >{order.dateOrdered}</Td>
            <Td>
                <Badge colorScheme={checkOrderStat(order.status).color}>{checkOrderStat(order.status).label}</Badge>
            </Td>
            <Td>
                {order.shippingMethod}
            </Td>
            <Td>
                <ButtonGroup>
                    <ShowOrder
                        checkedList={order?.products}
                        tag={checkOrderStat(order.status)}
                        footerBtn={(onClose) => (
                            <Button size='sm' variant='outline' colorScheme='green' onClick={() => handleConfirm(onClose, order.status === 1 ? 2 : order.status === 2 ? 4 : 5)} isDisabled={isLoading || order.status === 3 || (isUserFound && order.status < 4)}>{isLoading ? 'Please wait' : order.status === 1 ? 'Confirm && Deliver' : order.status === 2 ? 'Confirm Recieved' : order.status === 3 ? 'Cancelled' : order.status === 4 ? 'See Ratings' : ''}</Button>
                        )}
                        userID={order.userID}
                        setFound={setFound}
                        shippingMethod={order.shippingMethod}
                        trackingID={order.trackingID}
                    />
                    {!dashDis && <Button variant='outline' size='sm' colorScheme='red' onClick={() => handleCancel()} isDisabled={isLoading || order.status === 3 || order.status === 4 || order.status === 5}>{isLoading ? 'Cancelling...' : 'Cancel'}</Button>}
                    {!dashDis && <ModalCont
                        btn={(onOpen) => (
                            <Button size='sm' variant='outline' colorScheme='orange' isDisabled={isLoading} ml='5px' onClick={onOpen}>Message</Button>
                        )}
                        body={() => (
                            <Textarea placeholder="Type a message" border='1px solid teal' h='70px' value={message} onChange={e => setMessage(e.target.value)}></Textarea>
                        )}
                        footer={(onClose) => (
                            <>
                                <Button size='sm' variant='ghost' colorScheme='green' float='left' onClick={() => sendMsg(order.id, onClose, order.userID)}>Send</Button>
                                <Button size='sm' variant='ghost' colorScheme='red' ml='5px' float='left' onClick={onClose}>Cancel</Button>
                            </>
                        )}
                        footerP='10px'
                        size="sm"
                        title={"Order: " + order.trackingID}
                    />}
                </ButtonGroup>
            </Td>
        </Tr>
    );
};

export default OrderById;