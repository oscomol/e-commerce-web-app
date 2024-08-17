import { Box, Flex, Text, Spacer, Badge } from "@chakra-ui/react";
import Charts from '../statistics/charts/Chart';
import { FaTable } from 'react-icons/fa';
import { useEffect, useState } from "react";
import useGetSalesPerMonth from "../../../hooks/useGetSalesPerMonth";

const Statisctics = ({ chartW, isMin700 }) => {
    const {salesData} = useGetSalesPerMonth('2024');
    const [state, setState] = useState(null);

    useEffect(() => {
       setState({
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            }
        },
        series: [
            {
                name: "series-1",
                data: salesData
            }
        ],
        type: "area"
    })
    }, [salesData]);

    return (
        <Box w={chartW} bg='lightgray' p='15px' borderRadius='md'>
            <Flex align='center' gap='7'>
                <Text fontWeight='bold' fontSize='20px'><FaTable /></Text>
                <Text fontWeight='bold' fontSize='20px'>Sales statistics</Text>
                <Spacer />
                <Badge bg='none' color='gray'>2023-2024</Badge>
            </Flex>
            <Box w='100%' minHeight={isMin700 ? '30vh':'50vh'}>
                {state !== null && <Charts data={state} />}
            </Box>
        </Box>
    );
};

export default Statisctics;