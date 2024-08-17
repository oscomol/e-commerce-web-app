import { Flex, Badge, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import Main from "../Main";
import OrderFilter from "./OrderFilter";
import OrderContent from "./OrderContent";

const Orders = () => {
    const [selectedOrder, setSelectedOrder] = useState({status: "Pending", PIN: 1});

    return (
        <>
            <Main
                title="Orders"
                otherBtn={<Flex w='40%' justify='flex-end'>
                    <OrderFilter
                        selectedOrder={selectedOrder}
                        setSelectedOrder={setSelectedOrder}
                    />
                </Flex>}
            />
            <Box p='30px'>
                <Badge fontSize='xxl' bg='none' mb='20px'>Orders</Badge>
                <Box bg='lightgray' p='15px' borderRadius='md'>
                    <OrderContent status={selectedOrder.PIN} />
                </Box>
            </Box>
        </>
    );
};

export default Orders;