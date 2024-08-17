import { FaBell, FaBellSlash } from "react-icons/fa";
import { Badge, Box, Center, Flex, Text } from "@chakra-ui/react";

import PopOverCont from "../../../../common/PopOverCont";
import { useDispatch, useSelector } from "react-redux";
import { getNotificaion, setNotification } from "../../../../api/slices/authSliceData";
import NotificationById from "./NotificationById";
import { useEffect, useState } from "react";
import { socket } from "../../../../../socket/socket";

const Notification = () => {
    const notification = useSelector(getNotificaion);
    const [unread, setUnread] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        if(notification?.length){
            const unreadNotif = notification.filter(list => list.recieverID == '0' && list.isOpen == 0);
            setUnread(unreadNotif.length)
        }else{
            setUnread(0)
        }
    }, [notification])

    const seenNotif = (id) => {
        const mappedNotif = notification.map(data => {
            if(data.id == id){
                return {...data, isOpen: 1}
            }else{
                return data;
            }
        })
        dispatch(setNotification(mappedNotif))
    }

    const handleDelete = async (id) => {
        await socket.emit('deleteNotif', {id});
        dispatch(setNotification(notification.filter(data => data.id !== id)))
    }

    let content = '';
    if (notification?.length) {
        content = notification.map(notif => (
            <NotificationById key={notif.id} notification={notif} seenNotif={seenNotif} handleDelete={handleDelete}/>
        ))
    } else {
        content = <Flex flexDir='column' mt='50px' align='center'>
            <Text fontSize='30px'><FaBellSlash /></Text>
            <Text fontSize='15px'>No notification</Text>
        </Flex>
    }

    return (
        <>
            <PopOverCont
                btn={<Box>
                    {unread > 0 && <Flex w='20px' h='20px' borderRadius="50%" bg='red.400' position='absolute' top='6px' right='56px' justify='center' align='center'>
                        <Text color='white' fontWeight='bold'>{unread}</Text>
                    </Flex>}
                    <Text><FaBell /></Text>
                </Box>}
                body={<Box w='100%' h='70vh' bg='white' border='1px solid lightgray' borderRadius='md' zIndex={1}>
                    <Badge p='15px'>Notification</Badge>
                    {content}
                </Box>}
            />
        </>
    );
};

export default Notification;