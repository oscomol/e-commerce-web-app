import { Flex } from '@chakra-ui/react';
import Main from '../../main/Main';
import PerNotification from './PerNotification';
import { useDispatch, useSelector } from 'react-redux';
import { getNotificaion, setNotification } from '../../api/slices/authSliceData';
import { socket } from '../../../socket/socket';


const Notification = () => {
    const notifications = useSelector(getNotificaion)
    const dispatch = useDispatch();

    const seenNotif = (id) => {
        const mappedNotif = notifications.map(data => {
            if(data.id === id){
                return {...data, isOpen: 1}
            }else{
                return data;
            }
        })
        dispatch(setNotification(mappedNotif))
    }

    const handleDelete = async (id) => {
        await socket.emit('deleteNotif', {id});
        dispatch(setNotification(notifications.filter(data => data.id !== id)))
    }

    return (
        <>
            <Main />
            <Flex gap='15px' flexDir='column' p='30px 30px 50px 30px' pb='60px'>
                {notifications.map(notif => (
                    <PerNotification key={notif.id} notification={notif} seenNotif={seenNotif} handleDelete={handleDelete}/>
                ))}
            </Flex>
        </>
    );
};

export default Notification;