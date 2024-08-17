import { Badge, Flex, Grid, GridItem, Spacer, Text, CircularProgressLabel, CircularProgress, Center, Box, useMediaQuery } from '@chakra-ui/react';
import { FaCalendar } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';
import { useEffect, useState } from "react";

import { dashboardCont, gridContent } from './dashboard.style';
import Sales from './contents/Sales';
import Users from './contents/Users';
import Products from './contents/Products';
import TodaySale from './contents/TodaySale';
import OrderContent from '../orders/OrderContent';
import Statisctics from './Statisctics';
import HighestDaySale from './contents/HighestDaySale';

const DashBoardContent = () => {
  const [isMin700, isLargerThan1150, isMax670, isMax950, isMax1300] = useMediaQuery(['(min-width: 700px)','(min-width: 1150px)', '(max-width: 670px)', '(max-width: 950px)', '(max-width: 1300px)']);
  const [gap, setGap] = useState(6);
  const [chartW, setChartW] = useState('66.1%');

  useEffect(() => {
    if (isMax670) {
      setGap(4)
    } else {
      if (isMax950) {
        setGap(6)
      } else {
        if (isMax1300) {
          setGap(4)
        } else {
          setGap(6)
        }
      }
    }
  }, [isMax1300, isMax950, isMax670]);

  useEffect(() => {
    if (!isLargerThan1150) {
      setChartW('100%');
    } else {
      setChartW('66.1%');
    }
  }, [isLargerThan1150]);

  return (
    <Flex flexDir='column' gap={gap}>
      <Flex gap={gap}>
        <Flex w={!isLargerThan1150 ? '100%' : '66.1%'} gap={gap}>
          <Box sx={{ ...gridContent(100), width: "49.1%" }}><Sales /></Box>
          <Box sx={{ ...gridContent(100), width: "49.1%" }}><Products /></Box>
        </Flex>
        {isLargerThan1150 && <Box sx={{ ...gridContent(100), width: "31.9%" }}><Users /></Box>}
      </Flex>
      {!isLargerThan1150 && <Flex gap={gap} w='100%%'>
        <Box sx={{ ...gridContent(100), w: '49%' }}><Users /></Box>
        <Box sx={{ ...gridContent(100), w: '49%' }}><TodaySale /></Box>
      </Flex>}

      <Flex gap={gap}>
        <Statisctics chartW={chartW} isMin700={isMin700} />
        {isLargerThan1150 && <HighestDaySale />}
      </Flex>

      <Box w='100%' bg='lightgray' borderRadius='md' p='15px'>
        <Flex align='center' gap='7' mb='7px'>
          <Text fontWeight='bold' fontSize='20px'><FaCartShopping /></Text>
          <Text fontWeight='bold' fontSize='20px'>Recent orders</Text>
        </Flex>
        <OrderContent dashDis={true} />
      </Box>
    </Flex>
  );
};

export default DashBoardContent;