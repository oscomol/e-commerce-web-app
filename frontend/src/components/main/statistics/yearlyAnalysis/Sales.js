import { Box, Badge, useMediaQuery } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Charts from "../charts/Chart";
import useGetSalesPerMonth from "../../../../hooks/useGetSalesPerMonth";

const Sales = ({ w, year, isMin700 }) => {
 
  const {salesData, orderData} = useGetSalesPerMonth(year);

  const [state, setState] = useState(null);

  useEffect(() => {
    setState({
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        }
      },
      series: [
        {
          name: "Orders",
          data: orderData
        },
        {
          name: "Sales",
          data: salesData
        }
      ],
      type: "area"
    })
  }, [salesData, orderData]);

  return (
    <Box w={w} bg='lightgray' borderRadius="md" p='10px' minHeight='48%'>
      <Badge bg='none' color='gray'>Sales and orders</Badge>
      {state !== null &&  <Charts data={state} />}
    </Box>
  );
};

export default Sales;