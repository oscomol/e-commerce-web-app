import TableCont from "../../../common/TableCont";
import { Box, Badge, Tr, Th, Td } from "@chakra-ui/react";

const CommonContOrders = ({ title, head, body }) => {

    return (
        <Box p='30px'>
            <Badge bg='none' mb='10px' fontSize='lg'>{title}</Badge>
            <TableCont {...{ head, body }} />
        </Box>
    );
};

export default CommonContOrders;