import {
    Tr,
    Th,
    Td,
    Box,
} from '@chakra-ui/react'
import TableCont from '../../../common/TableCont';
import useGetTopSellingProduct from '../../../../hooks/useGetTopSellingProduct';

const TopSelling = ({year}) => {
   const topSelling = useGetTopSellingProduct(year);

    return (
        <Box p='15px' borderRadius='md' bg='lightgray'>
            <TableCont
                head={<Tr>
                    <Th>Product</Th>
                    <Th>Orders</Th>
                    <Th>Sales</Th>
                    <Th>Capital</Th>
                    <Th>Profit</Th>
                </Tr>}
                body={topSelling.map(data => (
                    <Tr key={data.id}>
                        <Td>{data?.item}</Td>
                        <Td>{data.quantity}</Td>
                        <Td>{data.price * data.quantity}</Td>
                        <Td>{data.capital * data.quantity}</Td>
                        <Td>{(data.price * data.quantity) - data.capital * data.quantity}</Td>
                    </Tr>
                ))}
                size='sm'
            />
        </Box>
    );
};

export default TopSelling;