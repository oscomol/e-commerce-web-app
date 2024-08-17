import { Badge, Box, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import Charts from "../charts/Chart";
import useGetSaleByCategory from "../../../../hooks/useGetSaleByCategory";

const CategoryAnalysis = ({year}) => {
    const {categories} = useGetSaleByCategory(year);

    const [state, setState] = useState(null)

    useEffect(() => {
        if(categories?.length){
            const category = categories.map(category => category.category)
            const sale = categories.map(category => category.sale)
            setState({
                options: {
                    chart: {
                        id: "basic-bar",
                    },
                    xaxis: {
                        categories: category
                    }
                },
                series: [
                    {
                        name: "Sales",
                        data: sale
                    }
                ],
                type: "area",
                h: "100%"
            })

        }
        
    }, [categories]);

    return (
        <>
            <Box h='48%' w='100%' bg='lightgray' borderRadius='10px' p='15px' mb='20px'>
                <Badge bg='none' color='gray'>Sales and order based on category</Badge>
                {state !== null && <Charts data={state} />}
            </Box>
        </>
    );
};

export default CategoryAnalysis;