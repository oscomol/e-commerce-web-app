import { Box, Text, useMediaQuery } from '@chakra-ui/react';

import Header from './header/Header';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useRefreshMutation } from '../../api/slices/authApiSlice';
import { jwtDecode } from 'jwt-decode';

const UserRootLayout = () => {
    const [isMax1142, isMax1225, isMax1320, isMax1440] = useMediaQuery(['(max-width: 1142px)', '(max-width: 1225px)', '(max-width: 1320px)', '(max-width: 1440px)']);

    const [pad, setPad] = useState('15%');

    const [refresh] = useRefreshMutation();

    const navigate = useNavigate();

    useEffect(() => {
        const refreshResult = async () => {
            try{
                const res = await refresh().unwrap();
                if(res?.accesToken) {
                    const user = jwtDecode(res?.accesToken);
                    // navigate(user?.userinfo?.role === 1 ? '/admin':'dashboard');
                }
            }catch(err){
                console.log(err);
            }
        }
        refreshResult();
    }, []);

    useEffect(() => {
       if(isMax1142){
        setPad('3%');
       }else{
        if(isMax1225){
            setPad('6%');
           }else{
            if(isMax1320){
                setPad('9%');
            }else{
                if(isMax1440){
                    setPad('12%');
                }else{
                    setPad('15%');
                }
            }
           }
       }
    }, [isMax1142, isMax1225, isMax1320, isMax1440]);

    return (
       
            <Box
                w='100%'
            >
                <Header pad={pad} />
                <Box p={`10px ${pad} 10px ${pad}`} w='100%'>
                    <Outlet />
                </Box>
            </Box>
    );
};

export default UserRootLayout;
