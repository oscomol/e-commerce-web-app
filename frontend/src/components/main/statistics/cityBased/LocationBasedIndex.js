import { Badge, Flex, Grid, GridItem, useMediaQuery } from "@chakra-ui/react";

import CityBased from "./CityBased";
import CityBasedProfCap from "./CityBasedProfCap";

const LocationBasedIndex = () => {
    const [isMax1200] = useMediaQuery("(max-width: 1200px)");

    return (
        <Flex flexDir={isMax1200 ? 'column' : 'row'} gap='15px' h='auto'>
            <CityBased w={isMax1200 ? '100%' : '49%'} />
            <CityBasedProfCap w={isMax1200 ? '100%' : '49%'} />
        </Flex>
    );
};

export default LocationBasedIndex;