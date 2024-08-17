import React, { useEffect, useState } from 'react';
import { socket } from '../socket/socket';
import { useSelector } from 'react-redux';
import { getToken } from '@chakra-ui/react';

const useSocketConnect = () => {
    const [socketID, setSocketID] = useState('');
    const token = useSelector(getToken)

    useEffect(() => {
        socket.connect();
        socket.on('connect', () => {
            const socketID = socket.id;
            if(socketID){
               setSocketID(socketID);
            }  
           })
    }, [token]);

    return socketID;
};

export default useSocketConnect;