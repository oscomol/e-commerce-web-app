import { Box, Flex, Text, useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import { socket } from '../../../socket/socket';
import OrderMessage from './OrderMessage';

const PerMessage = ({ message }) => {
    const [isMax650, isMax800, isMax1050] = useMediaQuery(['(max-width: 650px)', '(max-width: 800px)', '(max-width: 1050px)']);
    const { id } = useAuth();

    const handleDelete = () => {
        const initialData = { id: message.id, access: message.access == id ? '' : 'A', sender: id };

        try {
            socket.emit('deleteMessage', initialData);
        } catch (err) {
            console.log(err);
        } finally {
            socket.off('deleteMessage')
        }
    }

    return (
        <Box alignSelf={message.sender === id ? 'flex-end' : 'flex-start'} w={isMax650 ? '80%' : isMax800 ? '55%' : isMax1050 ? '45%' : '40%'}>
            {message.orderID && <OrderMessage orderID={message.orderID} />}
            <Box p='15px' borderRadius='md' bg={message.sender === id ? 'green.300' : 'lightgray'} >
                <Text>{message.message}</Text>
                <Flex justify='space-between' align='center'>
                    <Text fontSize='sm'>{message.dateTime}</Text>
                    <Text fontSize='sm' onClick={handleDelete}><FaTrashAlt /></Text>
                </Flex>
            </Box>
        </Box>
    );
};

export default PerMessage;