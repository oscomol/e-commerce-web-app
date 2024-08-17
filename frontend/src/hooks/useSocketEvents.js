import React, { useEffect } from 'react';
import { setNotification, setOrder, setProducts, setSocketID } from '../components/api/slices/authSliceData';
import { socket } from '../socket/socket';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from './useAuth';
import useSocketConnect from './useSocketConnect';

const useSocketEvents = () => {
    const { id, role } = useAuth();
    const dispatch = useDispatch();
    const socketID = useSocketConnect();

    useEffect(() => {
        if (socketID) {
            dispatch(setSocketID(socketID));
            socket.emit('user', { role, id, socketID });
        }

        return () => {
            socket.off('user');
        }
    }, [socketID, id]);

    useEffect(() => {
        socket.on('orderRes', (data) => {
            if (data?.length) {
                dispatch(setOrder(data));
            }
        })

        socket.on('getProduct', (data) => {
            if (data?.length) {
                dispatch(setProducts(data));
            }
        })

        socket.on('notifRes', (data) => {
            dispatch(setNotification(data))
        })

        
        return () => {
            socket.off('orderRes');
            socket.off('notifRes');
            socket.off('getProduct');
        }
    }, [socket, id]);
};

export default useSocketEvents;