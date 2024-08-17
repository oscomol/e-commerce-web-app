import Navigation from './navigation/Navigation';
import CommonLayout from "../common/CommonLayout";
import { useDispatch } from 'react-redux';
import { setMessages, setNavs, setNotification } from '../../api/slices/authSliceData';
import { useEffect } from 'react';
import { socket } from '../../../socket/socket';
import {Flex, Text, Img, useMediaQuery} from "@chakra-ui/react";
import { useLocation } from 'react-router-dom';

const RootLayout = () => {
    const [isLargerThan780] = useMediaQuery('(max-width: 600px)');
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;
        const length = path.split('/').filter(elem => elem !== "").map((elem, index) => {
            if(index === 0){
                elem = 'Main menu'
            }
            const data = {
                label:  elem[0].toLocaleUpperCase() + elem.slice(1, elem.length),
                link: "#",
                id: index++
            }
            return data;
        });
        dispatch(setNavs(length))
    }, [location]);

    useEffect(() => {
        socket.on('recieveMessage', (data) => {

            dispatch(setMessages(data))
        })


        return () => {
            socket.off('recieveMessage');
        }
    }, [socket]);

    return (
        <>
            {isLargerThan780 ?
                <Flex w='100%' h='80vh' justify='center' align='center' flexDir='column' gap='5px'>
                    <Img src="photos/screen.png" w='100px' h='100px' />
                    <Text fontWeight={600} fontSize='md'>Maximum screen or rotate phone</Text>
                </Flex>
                : <CommonLayout navs={<Navigation />} />}
        </>

    );
};

export default RootLayout;