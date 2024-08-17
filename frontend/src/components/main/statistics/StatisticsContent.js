import { Badge, Box, Flex, useMediaQuery } from "@chakra-ui/react";

import YearlyAnalysis from "./yearlyAnalysis/YearlyAnalysis";
import CategoryAnalysis from "./categoryBased/CategoryBased";
import CapitalProfit from "./categoryBased/CapitalProfit";
import LocationBasedIndex from "./cityBased/LocationBasedIndex";
import TopSelling from "./topSelling/TopSellingProduct";

const StatisticsContent = ({year}) => {
    const [isMin700, isMax930, isMax1200, isMax1100] = useMediaQuery(['(min-width: 740px)', '(max-width: 930px)', '(max-width: 1200px)', '(max-width: 1100px)']);

    return (
        <>
            <Box p={isMax930 ? '5px 13px 13px 15px' : isMax1100 ? '10px 25px 25px 30px' : isMax1200 ? '5px 13px 13px 15px' : '10px 25px 25px 30px'} border='1px solid lightgray' borderRadius='10px' w='100%'>
                <Badge bg='none'>Total sales, order, capital and profit</Badge>
                <YearlyAnalysis year={year} />
            </Box>

            <Box mt='20px' p={isMax930 ? '5px 13px 13px 15px' : isMax1100 ? '10px 25px 25px 30px' : isMax1200 ? '5px 13px 13px 15px' : '10px 25px 25px 30px'} border='1px solid lightgray' borderRadius='10px' h={isMin700 ? '600px':'300px'}>
                <Badge bg='none' mb='7px'>Sales generated per category</Badge>
                <CategoryAnalysis  year={year} />
                <CapitalProfit  year={year}/>
            </Box>

            <Box h='100%' mt='20px' p={isMax930 ? '5px 13px 13px 15px' : isMax1100 ? '10px 25px 25px 30px' : isMax1200 ? '5px 13px 13px 15px' : '10px 25px 25px 30px'} border='1px solid lightgray' borderRadius='10px'>
                <Badge bg='none' mb='7px'>Top selling products</Badge>
                <TopSelling  year={year} />
            </Box>
        </>
    )
};

export default StatisticsContent;