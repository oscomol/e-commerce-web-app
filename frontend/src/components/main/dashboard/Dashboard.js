import { Box, useMediaQuery } from "@chakra-ui/react";
import DashBoardContent from "./DashBoardContent";

const Dashboard = () => {
    const [isMax600] = useMediaQuery('(max-width: 600px)');
    
    return (
        <Box p={isMax600 ? '15px':'30px'} w='100%'>
            <DashBoardContent />
        </Box>
    );
};

export default Dashboard;