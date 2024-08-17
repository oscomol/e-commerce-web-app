import { FaEnvelope } from "react-icons/fa";
import { Badge, Box, Flex, Spacer, Text } from "@chakra-ui/react";

import PopOverCont from "../../../../common/PopOverCont";
import { useSelector } from "react-redux";
import { getMessages } from "../../../../api/slices/authSliceData";
import { useEffect, useState } from "react";
import { selectAllUser } from "../../../../api/slices/userSlice";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../../hooks/useAuth";

const Message = () => {
    const {id} = useAuth();
    const messages = useSelector(getMessages);
    const users = useSelector(selectAllUser);
    const [heads, setHeads] = useState([]);
    const [unread, setUnread] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (messages?.length) {
            setUnread(messages.filter(list => list.isSeen == 0 && list.sender != id)?.length);
            const usersOnly = messages.filter(list => list.role === 2);
            const usersAccess = usersOnly.map(list => list.sender);
            const ids = [... new Set(usersAccess)];
            const userMessages = ids.map(id => {
                const convos = messages.filter(list => list.sender === id || list.reciever === id);
                const user = users.find(list => list.id === id);

                return { messages: convos, username: user?.username ?? '', id }
            })
            setHeads(userMessages)
        }

        return () => {
            setHeads([])
            setUnread('')
        }
    }, [messages]);

    const openConversation = (id) => {
        navigate(`message/${id}`);
    }

    let content;
    if (heads?.length) {
        content = heads.map(user => (
            <Box key={user.id} mt='10px' cursor='default' onClick={() => openConversation(user.id)} fontWeight={user?.messages.some(message => (message.isSeen == 0 && message.sender != id)) ? 'bold' : 'normal'}>
                <Text>{user.username}</Text>
                <Flex>
                    <Text>{user.messages[user.messages?.length - 1].message}</Text>
                    <Spacer />
                    <Text fontSize='sm'>{user.messages[user.messages?.length - 1].dateTime.slice(user.messages[0].dateTime.indexOf(','))}</Text>
                </Flex>
            </Box>
        ))
    }

    return (
        <>
            <PopOverCont
                btn={<Box>
                    {unread > 0 && <Flex w='20px' h='20px' borderRadius="50%" bg='red.400' position='absolute' top='6px' right='90px' justify='center' align='center'>
                    <Text color='white' fontWeight='bold'>{unread}</Text>
                    </Flex>}
                    <Text><FaEnvelope /></Text>
                </Box>}
                body={<Box w='100%' h='70vh' bg='white' border='1px solid lightgray' p='15px' borderRadius='md'>
                    <Badge>Messages</Badge>
                    <Box mt='10px' pt='15px' borderTop='1px solid lightgray'>
                        {content}
                    </Box>
                </Box>}
            />
        </>
    );
};

export default Message;