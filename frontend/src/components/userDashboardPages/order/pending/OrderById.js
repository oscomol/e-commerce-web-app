import { Tr, Td, Flex, Text, Button, Textarea } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import OrderProductById from "../OrderProductById";
import ShowOrder from "../ShowOrder";
import { socket } from "../../../../socket/socket";
import useAuth from "../../../../hooks/useAuth";
import MessageThisOrder from "../common/MessageThisOrder";

const OrderById = ({ order }) => {
    const [price, setPrice] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useAuth();

    useEffect(() => {
        if (price?.length > 0) {
            setTotalPrice(price.length > 1 ? price.reduce((p1, p2) => p1 + p2) : price[0])
        }

        return () => {
            setTotalPrice(0)
        }
    }, [price.length]);

    const handleCancel = async (onClose) => {
        try {
            setIsLoading(true)
            const orderID = order.products[0].orderID;
            await socket.emit('orderUpdate', ({ id: orderID, status: 3, userID: id }));
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false);
            onClose()
        }
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
                {order.dateOrdered}
            </Td>
            <Td>
                {totalPrice}
            </Td>
            <Td>
                {order.shippingFee}
            </Td>
            <Td>
                {totalPrice + order.shippingFee}
            </Td>
            <Td>
                <ShowOrder
                    checkedList={order?.products}
                    shippingMethod={order.shippingMethod}
                    trackingID={order.trackingID}
                    tag={{ label: "Delivery attempt 1 to 2 days from now", color: 'teal' }}
                    footerBtn={(onClose) => (
                        <Button size='sm' variant='ghost' colorScheme='red' onClick={() => handleCancel(onClose)} isDisabled={isLoading}>{isLoading ? 'Cancelling...' : 'Cancel'}</Button>
                    )}
                />
                <MessageThisOrder order={order} />
            </Td>
        </Tr>
    );
};

export default OrderById;