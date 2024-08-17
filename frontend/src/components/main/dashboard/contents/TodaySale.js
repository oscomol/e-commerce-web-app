import React from 'react';
import { FaCalendar } from 'react-icons/fa';

import DashSummary from './common/DashSummary';
import useGetTotalSale from '../../../../hooks/useGetTotalSale';

const TodaySale = () => {

    const sales = useGetTotalSale(new Date().toLocaleDateString());

    return (
        <DashSummary
        icon={<FaCalendar />}
        color="blue.300"
        helperText="Sale in a day is 10000"
        title="Today's sale"
        data={sales}
        />
    );
};

export default TodaySale;