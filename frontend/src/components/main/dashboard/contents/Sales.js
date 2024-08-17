import { FaDollarSign } from 'react-icons/fa';

import DashSummary from './common/DashSummary';
import useGetTotalSale from '../../../../hooks/useGetTotalSale';

const Sales = () => {
    const totalSale = useGetTotalSale('total');
   
    return (
       <DashSummary
        icon={<FaDollarSign />}
        color="orange.300"
        helperText="Feb 10 to Mar 10, 2020"
        title="Total sales"
        data={totalSale}
       />
    );
};

export default Sales;