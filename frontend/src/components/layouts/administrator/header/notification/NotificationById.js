import { Badge, Box, Button, Flex, Spacer, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ModalCont from '../../../../common/ModalContent';
import Rating from './Rating';
import { FaTrashAlt } from 'react-icons/fa';

const NotificationById = ({ notification, seenNotif, handleDelete }) => {
    const [notif, setNotif] = useState('');

    useEffect(() => {
        if (notification?.notification) {
            setNotif(notification.notification.length > 35 ? `${notification.notification.slice(0, 35)} ...` : notification.notification)
        }
    }, [notification.id]);

    

    return (

        <ModalCont
            btn={(onOpen) => (
                <Box mb='10px' fontWeight={notification.isOpen === 1 ? 'normal' : 'bold'} paddingInline='15px' borderBottom='1p solid lightgray' cursor='default' onClick={onOpen}>
                    <Text>Order rated<Text as="span" float='right' fontSize='13px'>{notification.date}</Text></Text>
                    <Flex align='center'>
                        <Text fontSize='13px' mt='-7px'>{notif}</Text>
                        <Spacer />
                        <Badge colorScheme='red' onClick={()=>handleDelete(notification.id)} mb='2px'><FaTrashAlt /></Badge>
                    </Flex>
                </Box>
            )}
            body={(onClose) => (
                notification?.notifType == 5 ? (
                    <Rating notification={notification} seenNotif={seenNotif} />
                ) : ""
            )}
            size="md"
            footerP='10px'
            title={notification?.notifType == 5 ? notification.notifID : 'HEY'}
        />
    );
};

export default NotificationById;