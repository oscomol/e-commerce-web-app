import { Box, useMediaQuery, Badge, Text, Tr, Th } from "@chakra-ui/react";

import Main from "../Main";
import LogsContent from "./logsContent/LogsContent";
import DateChooser from "./logsContent/DateChooser";
import { useGetLogsQuery } from "../../api/slices/logsSlice";
import { useEffect } from "react";
import TableCont from "../../common/TableCont";

const Logs = () => {
    const [isMax600] = useMediaQuery('(max-width: 600px)');
    const { data, isLoading, isSuccess, isError, error } = useGetLogsQuery('logs', {
        pollingInterval: 1000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    let content;
    if (isLoading) {
        content = <Text>Loading Activity Logs</Text>
    } else if (isSuccess) {
        const {ids, entities} = data;
        content = <Box p='15px' borderRadius='md' bg='lightgray'>
            <TableCont
                head={<Tr>
                    <Th>Name</Th>
                    <Th>Event</Th>
                    <Th>Date</Th>
                    <Th>Time</Th>
                    <Th>Action</Th>
                </Tr>}
                body={ids.map(id => (
                    <LogsContent key={id} logs={entities[id]} />
                ))}
            />
        </Box>
    } else {
        content = <Text>An error occur</Text>
    }

    return (
        <>
            <Main
                title="Logs"
                otherBtn={<DateChooser />}
            />
            <Box p={isMax600 ? '15px' : '30px'}>
                <Badge fontSize='xxl' bg='none' mb='20px'>Activity logs</Badge>
                {content}
            </Box>
        </>
    );
};

export default Logs;