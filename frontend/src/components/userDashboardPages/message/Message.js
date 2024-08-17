import React, { useEffect, useRef } from 'react';
import Main from '../../main/Main';
import { useState } from 'react';
import { Flex, InputRightElement, Input, InputGroup, Text, Button, useMediaQuery } from '@chakra-ui/react';
import PerMessage from './PerMessage';
import { FaCheck } from 'react-icons/fa';
import QuickMesaage from './QuickMesaage';
import useAuth from '../../../hooks/useAuth';
import { socket } from '../../../socket/socket';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages, setMessages } from '../../api/slices/authSliceData';

const Message = () => {
    const { id, role } = useAuth();
    const [isMax800, isMax950, isMax1050, isMax1250] = useMediaQuery(['(max-width: 800px)', '(max-width: 950px)', '(max-width: 1050px)', '(max-width: 1250px)']);
    const messages = useSelector(getMessages);

    const bottomRef = useRef(null);
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();

    const seenMessage = async (ids) => {
        try {
            socket.emit('seenMessage', ids);
        } catch (err) {
            console.log(err);
        } finally {
            socket.off('seenMessage')
        }
    }

    useEffect(() => {

        if (messages?.length) {
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
            const unreadMess = messages.filter(list => list.isSeen == 0 && list.role == 1);
            const ids = unreadMess.map(list => list.id);
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

    const handleNewMessage = async (mess) => {
        const initialData = { sender: id, message: mess, access: id + '-A', role };
        try {
            socket.emit('newMessage', initialData)
        } catch (err) {
            console.log(err)
        } finally {
            socket.off('newMessage')
            setMessage('')
        }
    }

    return (
        <>
            <Main />
            <Flex p='30px 30px 80px 30px' flexDir='column' gap='15px'>
                {messages.map(mess => (
                    <PerMessage key={mess.id} message={mess} />
                ))}
                <Flex ref={bottomRef} w='100%' justify='space-around'>
                    {isMax800 ? null : isMax1250 && <QuickMesaage handleNewMessage={handleNewMessage}/>}
                </Flex>
            </Flex>
            <Flex position='fixed' right='30px' w={isMax950 ? '92%' : '78%'} bottom='0' gap='5px' bg='white' pb='20px'>
                <Flex w={isMax1250 ? '100%' : '40%'} gap='5px'>
                    <InputGroup>
                        <Input placeholder='Type a new message' border='1px solid teal' size='lg' autoFocus value={message} onChange={e => setMessage(e.target.value)} />
                        <InputRightElement>
                            <Text color='red.500' fontSize='lg' pt='10px'>X</Text>
                        </InputRightElement>
                    </InputGroup>
                    <Button size='lg' colorScheme='green' leftIcon={<FaCheck />} onClick={()=>handleNewMessage(message)} isDisabled={!message}>Send</Button>
                </Flex>
                {!isMax1250 && <Flex w='60%' gap='5px'>
                    <QuickMesaage handleNewMessage={handleNewMessage}/>
                </Flex>}
            </Flex>
        </>
    );
};

export default Message;