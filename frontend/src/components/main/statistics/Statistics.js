import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Box,
    Badge,
    useMediaQuery
  } from '@chakra-ui/react'

import Main from "../Main";
import StatisticsContent from "./StatisticsContent";
import { useEffect, useState } from 'react';

const Statistics = () => {
  const [isMax600] = useMediaQuery('(max-width: 600px)')
  const [year, setYear] = useState('');

  useEffect(() => {
    const yearToday = new Date().getFullYear();
    setYear(yearToday);
  }, []);

  const handleChange = (e) => {
    setYear(e)
  }

    return (
        <>
            <Main
                title="Sales statistics"
                otherBtn={<NumberInput step={1} value={year}
                onChange={handleChange} min={2020}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>}
            />
            <Box p={isMax600 ? '15px':'30px'} w='100%'>
                <Badge fontSize='xxl' bg='none' mb='20px'>Sales statistics generated on year {year}</Badge>
                <StatisticsContent year={year} />
            </Box>
        </>
    );
};

export default Statistics;