import { Badge, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import Charts from "../charts/Chart";
import useGetSalesPerMonth from "../../../../hooks/useGetSalesPerMonth";

const Orders = ({w, year, isMin700}) => {
  const { capitalPrice, profit } = useGetSalesPerMonth(year);
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
                name: "Capital",
                data: capitalPrice,
              },
              {
                  name: "Profit",
                  data: profit
              }
            ],
            type: "line"
      })
    }, [capitalPrice, profit]);


    return (
        <Box w={w} bg='lightgray'  borderRadius="md" p='10px' minHeight='48%'>
            <Badge bg='none' color='gray'>Capital and profit</Badge>
            {state !== null && <Charts data={state} />}
        </Box>

    );
};

export default Orders;