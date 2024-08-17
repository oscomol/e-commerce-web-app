import { Flex, useMediaQuery } from "@chakra-ui/react";

import Sales from "./Sales";
import Orders from "./Orders";

const YearlyAnalysis = ({year}) => {
    const [isMin700, isMax850, isMax950, isMax1100] = useMediaQuery(['(min-width: 750px)', "(max-width: 850px)", "(max-width: 950px)", "(max-width: 1100px)"]);

    return (
        <Flex flexDir={isMax850 ? 'column':isMax950 ? 'row':isMax1100 ? 'column':'row'} gap='15px' h={isMin700 ? '300px':'500px'}>
            <Sales w={isMax850 ? '100%':isMax950 ? '49%':isMax1100 ? '100%':'100%'} year={year} isMin700={isMin700}/>
            <Orders w={isMax850 ? '100%':isMax950 ? '49%':isMax1100 ? '100%':'100%'} year={year} isMin700={isMin700}/>
        </Flex>

    );
};

export default YearlyAnalysis;