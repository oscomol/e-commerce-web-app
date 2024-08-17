import React, { useState } from 'react';
import ModalCont from '../../../common/ModalContent';
import { Button, Textarea } from '@chakra-ui/react';
import useAuth from '../../../../hooks/useAuth';
import { socket } from '../../../../socket/socket';

const MessageThisOrder = ({order}) => {
    const [isLoading, setIsLoading] = useState(false);
    const {id, role} = useAuth();
    const [message, setMessage] = useState('');


    const sendMsg = async (orderID, onClose) => {
        const initialData = { sender: id, message, access: id + '-A', role, orderID };
        await socket.emit('newMessage', initialData);
        onClose()
    }

    return (
        <ModalCont
            btn={(onOpen) => (
                <Button size='sm' variant='ghost' colorScheme='orange' isDisabled={isLoading} ml='5px' onClick={onOpen}>Message</Button>
            )}
            body={() => (
                <Textarea placeholder="Type a message" border='1px solid teal' h='70px' value={message} onChange={e => setMessage(e.target.value)}></Textarea>
            )}
            footer={(onClose) => (
                <>
                    <Button size='sm' variant='ghost' colorScheme='green' float='left' onClick={() => sendMsg(order.id, onClose)}>Send</Button>
                    <Button size='sm' variant='ghost' colorScheme='red' ml='5px' float='left' onClick={onClose}>Cancel</Button>
                </>
            )}
            footerP='10px'
            size="sm"
            title={"Order: " + order.trackingID}
        />
    );
};

export default MessageThisOrder;