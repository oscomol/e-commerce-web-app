import { Tr, Td, Flex, Text, Button, Textarea } from "@chakra-ui/react";
import OrderProductById from "../OrderProductById";
import { useEffect, useState } from "react";
import ShowOrder from "../ShowOrder";
import { socket } from "../../../../socket/socket";
import useAuth from "../../../../hooks/useAuth";
import ModalCont from "../../../common/ModalContent";

const OrderById = ({ order }) => {
    const [price, setPrice] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const { id, role } = useAuth();
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (price?.length > 0) {
            setTotalPrice(price.length > 1 ? price.reduce((p1, p2) => p1 + p2) : price[0])
        }

        return () => {
            setTotalPrice(0)
        }
    }, [price.length]);

    const handleRecieved = async (onClose) => {
        try {
            setIsLoading(true)
            const orderID = order.products[0].orderID;
            await socket.emit('orderUpdate', ({ id: orderID, status: 4, userID: id }));
        } catch (err) {
            alert(err);
        } finally {
            onClose();
            setIsLoading(false);
        }
    }

    const sendMsg = async (orderID, onClose) => {
        const initialData = { sender: id, message, access: id + '-A', role, orderID };
        await socket.emit('newMessage', initialData);
        onClose()
    }

    return (
        <Tr>
            <Td>
                <Flex gap='10px'>
                    {order.products.map((product, index) => (
                        <OrderProductById key={index} product={{ ...product, index: index + 1 }} setPrice={setPrice} />
                    ))}
                    <Text alignSelf='flex-end'>{order?.products?.length > 2 && `+${order.products.length - 2}`}</Text>
                </Flex>
            </Td>
            <Td>
                {order.trackingID}
            </Td>
            <Td>
                {order.date ?? '01-22-98'}
            </Td>
            <Td>
                {order.deliveryDate ?? '01-22-98'}
            </Td>
            <Td>
                {totalPrice + order.shippingFee}
            </Td>
            <Td>
                <ShowOrder
                    checkedList={order?.products}
                    shippingMethod={order.shippingMethod}
                    trackingID={order.trackingID}
                    tag={{ label: "Order delivered", color: 'teal' }}
                    footerBtn={(onClose) => (
                        <Button size='sm' variant='outline' isDisabled={isLoading} colorScheme='green' onClick={() => handleRecieved(onClose)}>{isLoading ? 'Please wait...' : 'Recieved'}</Button>
                    )}
                />
                 <ModalCont
                    btn={(onOpen) => (
                        <Button size='sm' variant='outline' colorScheme='orange' isDisabled={isLoading} ml='5px' onClick={onOpen}>Message</Button>
                    )}
                    body={() => (
                        <Textarea placeholder="Type a message" border='1px solid teal' h='70px' value={message} onChange={e=>setMessage(e.target.value)}></Textarea>
                    )}
                    footer={(onClose) => (
                        <>
                            <Button size='sm' variant='ghost' colorScheme='green' float='left' onClick={()=>sendMsg(order.id, onClose)}>Send</Button>
                            <Button size='sm' variant='ghost' colorScheme='red' ml='5px' float='left' onClick={onClose}>Cancel</Button>
                        </>
                    )}
                    footerP='10px'
                    size="sm"
                    title={"Order: " + order.trackingID}
                />
            </Td>
        </Tr>
    );
};

export default OrderById;