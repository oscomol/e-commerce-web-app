import { useSelector } from "react-redux";
import { getOrder } from "../../api/slices/authSliceData";
import { useEffect, useState } from "react";
import { selectAllproduct } from "../../api/slices/productSlice";
import { Badge, Box, Flex, Img, Text } from "@chakra-ui/react";

const OrderMessage = ({ orderID }) => {
    const orders = useSelector(getOrder);
    const products = useSelector(selectAllproduct)
    const [msgDetails, setMsg] = useState({});
    const [orderDetails, setOrderDetails] = useState({});

    useEffect(() => {
        if (orders.length) {
            const msgOrder = orders.find(list => list.id === orderID);
            if (msgOrder) {
                const mappedOrder = msgOrder.products.map((data, index) => {
                    const product = products.find(list => list.id === data.productID);
                    let newData = { price: data.price * data.quantity, id: data.id };
                    if (product && index < 4) {
                        newData = { ...newData, filename: product.filename }
                    }
                    return newData;
                })
                setMsg(mappedOrder);
                setOrderDetails({trackingID: msgOrder.trackingID, status: msgOrder.status, sf: msgOrder.shippingFee});
            }
        }

        return () => {
            setMsg({});
        }
    }, [orderID, orders])

    const checkOrderStat = (stat) => {
        let statLabel = {};
        if (stat === 1) {
            statLabel = {label: "Pending", color: 'teal'}
        } else {
            if (stat === 2) {
                statLabel = {label: "Delivered ", color: 'blue'}
            } else {
                if (stat === 3) {
                    statLabel = {label: "Cancelled", color: 'red'}
                } else {
                    if (stat === 4) {
                        statLabel = {label: "Completed", color: 'green'}
                    } else {
                        statLabel = {label: "To Rate", color: 'orange'}
                    }
                }
            }
        }

        return statLabel;
    }

    return (
        <Box lineHeight={4} mb='7px'>
            <Flex gap={2} >
                {msgDetails?.length && msgDetails.map(data => (
                    <Img src={`http://localhost:3500/product/${data.filename}`} w='50px' h='50px' key={data.id}/>
                ))}
                {msgDetails?.length > 3 && <Text>+{msgDetails.length - 4}</Text>}
            </Flex>
            <Badge colorScheme={checkOrderStat(orderDetails.status).color}>Status: {checkOrderStat(orderDetails.status).label}</Badge><br></br>
            <Badge colorScheme="white">Tracking ID: {orderDetails.trackingID}</Badge><br></br>
            <Badge colorScheme="white">Price: {msgDetails?.length > 1 ? msgDetails.map(data => data.price).reduce((p1, p2) => p1 + p2) : msgDetails[0]?.price}</Badge><br></br>
            <Badge colorScheme="white">Shipping fee: {orderDetails.sf}</Badge><br></br>
        </Box>
    );
};

export default OrderMessage;