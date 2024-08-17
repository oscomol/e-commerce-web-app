import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllUser } from '../../api/slices/userSlice';
import { Box, Text, Flex, useMediaQuery } from '@chakra-ui/react';
import useAuth from '../../../hooks/useAuth';
import { FaTrashAlt } from 'react-icons/fa';
import { socket } from '../../../socket/socket';
import OrderMessage from '../../userDashboardPages/message/OrderMessage';

const MessageById = ({ message, userID }) => {
    const [isMax650, isMax800, isMax1050] = useMediaQuery(['(max-width: 650px)', '(max-width: 800px)', '(max-width: 1050px)']);
    const users = useSelector(selectAllUser);
    const [sender, setSender] = useState('');
    const { id } = useAuth();

    useEffect(() => {
        if (id !== message.sender) {
            if (users) {
                const senderName = users.find(list => list.id == message.sender);
                if (senderName) {
                    setSender(senderName?.username ?? '');
                }
            }
        }
    }, [message.sender, users, id])

    const handleDelete = async () => {
        socket.emit('adminDeleteMessage', {id: message.id, reciever: userID, access: message.access === 'A' ? '':userID});
    }

    return (
        <Box w={isMax650 ? '80%' : isMax800 ? '55%' : isMax1050 ? '45%' : '40%'} alignSelf={message.sender == id ? 'flex-end' : 'flex-start'}>
            {sender && <Text color='gray' ml='5px'>{sender}</Text>}
            {message.orderID && <OrderMessage orderID={message.orderID} />}
            <Box p='15px' borderRadius='md' alignSelf={message.sender === id ? 'flex-end' : 'flex-start'} bg={message.role == 2 ? 'lightgray' : 'green.300'}>
                <Text>{message.message}</Text>
                <Flex justify='space-between' align='center'>
                    <Text fontSize='sm'>{message.dateTime}</Text>
                    <Text fontSize='sm' onClick={handleDelete}><FaTrashAlt /></Text>
                </Flex>
            </Box>
        </Box>
    );
};

export default MessageById;