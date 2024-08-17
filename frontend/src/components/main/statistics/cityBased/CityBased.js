import { Box, Badge } from "@chakra-ui/react";
import { useState } from "react";
import Charts from "../charts/Chart";

const CityBased = ({w}) => {
    const [state, setState] = useState({
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: [
                    "Bacolod",
                    "Bago",
                    "Cadiz",
                    "Escalante",
                    "Himamaylan",
                    "Kabankalan",
                    "La Carlota",
                    "Sagay",
                    "San Carlos",
                    "Silay",
                    "Sipalay",
                    "Talisay",
                    "Victorias",
                ]
            }
        },
        series: [
            {
                name: "Order",
                data: [500, 2400, 710, 500, 490, 300, 800, 910, 1500, 1600, 1700, 1700, 1800]
            },
            {
                name: "Sales",
                data: [550, 2800, 710, 500, 490, 500, 810, 910, 1300, 1200, 1200, 1700, 1800]
            }
        ],
        type: "area"
    })


    return (
        <Box h='100%' w={w} bg='lightgray'  borderRadius="md" p='10px' h='40vh'>
            <Badge bg='none' color='gray'>Sales and orders </Badge>
            <Charts data={state} />
        </Box>
    );
};

export default CityBased;