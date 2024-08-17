import { Box, Flex, Spacer, Text, Badge } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaCalendar } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { getOrder } from '../../../api/slices/authSliceData';
import useGetOneWeek from '../../../../hooks/useGetOneWeek';
import Charts from '../../statistics/charts/Chart';

const HighestDaySale = () => {
    const orders = useSelector(getOrder)?.filter(list => list.status === 4);
    const [state, setState] = useState(null);

    const lastweek = useGetOneWeek();

    const getOrderDetails = (data) => {
        let productPrice = [];
        const getOrders = orders.filter(list => list.recievedDate.includes(data.date));
        if (getOrders?.length) {
            for (let i = 0; i < getOrders.length; i++) {
                for (let x = 0; x < getOrders[i].products.length; x++) {
                    const order = getOrders[i].products[x];
                    const price = order.price * order.quantity;
                    productPrice.push(price);
                }
            }
            return productPrice;
        } else {
            return [];
        }

    }

    useEffect(() => {
        let dataWeek = [];
        for (let i = 0; i < lastweek.length; i++) {
            let price;
            const sales = getOrderDetails(lastweek[i]);
            if (sales.length > 0) {
                if (sales.length > 1) {
                    price = sales.reduce((p1, p2) => p1 + p2);
                } else {
                    price = sales[0];
                }
            } else {
                price = 0;
            }
            dataWeek.push({ day: lastweek[i].day, price })
        }

        if(dataWeek.length > 0){
            setState({
                options: {
                    chart: {
                        id: "basic-bar"
                    },
                    xaxis: {
                        categories: dataWeek.map(list => list.day)
                    }
                },
                series: [
                    {
                        name: "series-1",
                        data: dataWeek.map(list => list.price)
                    }
                ],
                type: "bar"
            })
        }
    }, [lastweek?.length, orders?.length]);

    return (
        <Box bg='lightgray' p='15px' borderRadius='md' w='31.9%'>
        <Flex align='center' gap='7'>
            <Text fontWeight='bold' fontSize='20px'><FaCalendar /></Text>
            <Text fontWeight='bold' fontSize='20px'>7 days sale</Text>
        </Flex>
        <Box w='100%' h='30vh'>
            {state !== null && <Charts data={state} />}
        </Box>
    </Box>
    );
};

export default HighestDaySale;