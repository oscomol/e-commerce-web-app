import { Flex, Image, Spacer, Text, useMediaQuery, Badge, HStack, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FaStar, FaTrashAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { getProducts } from '../../api/slices/authSliceData';
import useAuth from '../../../hooks/useAuth';
import SingleProduct from '../common/SingleProduct';
import { socket } from '../../../socket/socket';

const PerNotification = ({ notification, seenNotif, handleDelete}) => {
    const [isMax600] = useMediaQuery('(max-width: 600px)');
    const products = useSelector(getProducts);
    const [notifProd, setNotifPro] = useState({});

    useEffect(() => {
        if (notification.notifID && products?.length) {
            const getThatPro = products.find(list => list.id == notification.notifID);
            setNotifPro(getThatPro)
        }
    }, [notification, products.length]);

    const clickNotif = async (onOpen) => {
        onOpen();
        if(notification.isOpen === 0){
            seenNotif(notification.id);
        }
        await socket.emit('openNotif', {id: notification.id})
    }

    return (

        <SingleProduct
            btnBTN={(onOpen) => (
                <Flex borderRadius='md' p='15px' boxShadow='rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px' fontWeight={notification?.isOpen === 0 ? 'bold' : 'normal'} align={isMax600 ? 'flex-start' : 'center'} flexDir='column'>
                    <Flex align='center' w='100%'>
                        <Flex gap='10px' align='flex-end'>
                            <Image
                                src={`http://localhost:3500/product/${notifProd.filename}`}
                                borderRadius='lg'
                                width="40px"
                                height="40px"
                                onClick={()=>clickNotif(onOpen)}
                            />
                            <Text fontSize='13px'>{notifProd.brand}</Text>
                            <Text fontSize='13px' color={notifProd.discountedPrice ? 'black':'red'} textDecor={notifProd.discountedPrice ? 'line-through':'normal'}>{notifProd.storePrice}</Text>
                            {notifProd.discountedPrice && <Badge colorScheme='red' mb='2px'>{notifProd.discountedPrice}</Badge>}
                        </Flex>
                        <Spacer />
                        <Text fontSize='12px'>{notification.date + " " + notification.time}</Text>
                    </Flex>
                    <Flex align='center' w='100%'>
                        <Text>{notification.notification}</Text>
                        <Spacer />
                        <Badge onClick={()=>handleDelete(notification.id)} colorScheme='red'><FaTrashAlt /></Badge>
                    </Flex>
                </Flex>
            )}
            product={notifProd}
        />
    );
};

export default PerNotification;