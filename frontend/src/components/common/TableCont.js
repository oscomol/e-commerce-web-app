import {
    Table,
    Thead,
    Tbody,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'

const TableCont = ({head, body, footer, size}) => {
    return (
        <TableContainer border='1px solid lightgray' w='100%'>
        <Table variant='striped' size='sm'>
            <Thead>
                {head}
            </Thead>
            <Tbody>
               {body}
            </Tbody>
            {footer && footer}
        </Table>
    </TableContainer>
    );
};

export default TableCont;