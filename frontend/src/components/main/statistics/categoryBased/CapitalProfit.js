import { Badge, Box, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import Charts from "../charts/Chart";
import useGetSaleByCategory from "../../../../hooks/useGetSaleByCategory";

const CapitalProfit = ({year}) => {
    const [state, setState] = useState(null)
    const {categories} = useGetSaleByCategory(year);

    useEffect(() => {
        if(categories?.length){
            const category = categories.map(category => category.category)
            const profit = categories.map(category => category.profit)
            const capital = categories.map(category => category.capital)
            setState({
                options: {
                    chart: {
                        id: "basic-bar"
                    },
                    xaxis: {
                        categories: category
                    }
                },
                series: [
                    {
                        name: "Capital",
                        data: capital
                    },
                    {
                        name: "Profit",
                        data: profit
                    }
                ],
                type: "line",
                h: "90%"
            })
        }
    }, [categories]);

    return (
        <>
            <Box h='48%' w='100%' bg='lightgray' borderRadius='10px' p='15px'>
                <Badge bg='none' color='gray'>Capital and profit based on category</Badge>
                {state !== null && <Charts data={state} />}
            </Box>
        </>
    );
};

export default CapitalProfit;