import { Box } from "@chakra-ui/react";
import Chart from "react-apexcharts";

const Charts = ({ data }) => {

  return (
      <Chart
        options={data.options}
        series={data.series}
        type={data.type}
        width="100%"
        height="100%"
      />
  );
};

export default Charts;