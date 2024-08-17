import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getMessages, setMessages } from '../../api/slices/authSliceData';
import { selectAllUser } from '../../api/slices/userSlice';
import { Box, Button, Center, Flex, Input, InputGroup, InputRightElement, Text, useMediaQuery } from '@chakra-ui/react';
import MessageById from './MessageById';
import Main from '../Main';
import { FaCheck } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import { socket } from '../../../socket/socket';

const Messages = () => {
    const { id, role } = useAuth();
    const { userID } = useParams();
    const messages = useSelector(getMessages);
    const users = useSelector(selectAllUser);
    const [data, setData] = useState({});
    const [isMax800, isMax950, isMax1050, isMax1250] = useMediaQuery(['(max-width: 800px)', '(max-width: 950px)', '(max-width: 1050px)', '(max-width: 1250px)']);

    const bottomRef = useRef(null);
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        // if(data?.message){
        //     bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        // }
    }, [data?.message, messages]);

    const seenMessage = (ids) => {
        try {
            socket.emit('seenMessage', ids)
        } catch (err) {
            console.log(err);
        } finally {
            socket.off('seenMessage')
        }
    }

    useEffect(() => {

        if (messages?.length) {
            const unread = messages.filter(list => list.isSeen == 0 && list.sender != id);
            const ids = unread.map(list => list.id);
            const newMessages = messages.map(data => {
                if (ids.includes(data.id)) {
                    console.log(data)
                    return { ...data, isSeen: 1 }
                } else {
                    return data;
                }
            })
            if (newMessages.length) {
                dispatch(setMessages(newMessages));
                seenMessage(ids);
            }
        }

    }, [messages?.length]);

    const handleNewMessage = async () => {
        const initialData = { sender: id, message, access: userID + '-A', role, reciever: userID };
        console.log(initialData)
        try {
            socket.emit('newMessage', initialData)
        } catch (err) {
            console.log(err)
        } finally {
            socket.off('newMessage')
            setMessage('')
        }
    }

    useEffect(() => {
        if (users?.length && messages?.length) {
            const user = users.find(list => list.id == userID);
            const message = messages.filter(list => list.sender == userID || list.reciever == userID);
            setData({ username: user.username, id: userID, message })
        }

        return () => {
            setData({});
        }
    }, [users, messages, userID])

    return (
        <>
            <Main />
            <Box p='30px'>

                {/* <Flex>
                    <Text fontSize='lg' fontWeight='bold'>{data.username}</Text>
                </Flex> */}

                {data.message?.length &&
                    <Flex flexDir='column' gap='10px'>
                        {data.message.map(list => (
                            <MessageById key={list.id} message={list} userID={userID} />
                        ))}
                    </Flex>}
            </Box>
            <Flex position='fixed' right='30px' w={isMax950 ? '92%' : '78%'} bottom='0' gap='5px' bg='white' pb='20px'>
                <Flex w={isMax1250 ? '100%' : '40%'} gap='5px'>
                    <InputGroup>
                        <Input placeholder='Type a new message' border='1px solid teal' size='lg' autoFocus value={message} onChange={e => setMessage(e.target.value)} />
                        <InputRightElement>
                            <Text color='red.500' fontSize='lg' pt='10px'>X</Text>
                        </InputRightElement>
                    </InputGroup>
                    <Button size='lg' colorScheme='green' leftIcon={<FaCheck />} onClick={handleNewMessage} isDisabled={!message}>Send</Button>
                </Flex>
            </Flex>
            <Flex ref={bottomRef} w='100%' pb='80px' justify='space-around'>Bottom</Flex>
        </>
    );
};

export default Messages;