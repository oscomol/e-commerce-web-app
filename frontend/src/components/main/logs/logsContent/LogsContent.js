import React, { useEffect, useState } from 'react';
import { Button, Td, Th, Tr, Box } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { selectAllUser } from '../../../api/slices/userSlice';
import { useDeleteLogsMutation } from '../../../api/slices/logsSlice';

const LogsContent = ({ logs }) => {
    const user = useSelector(selectAllUser);
    const [username, setUsername] = useState('');
    const [deleteLogs, {isLoading}] = useDeleteLogsMutation();

    useEffect(() => {
        if(user?.length){
            const getUsername = user.find(list => list.id === logs.adminID);
            if(getUsername){
                setUsername(getUsername.username);
            }
        }
    }, [user, logs.adminID])

    const handleDelete = async () => {
        try{
            await deleteLogs({id: logs.id}).unwrap();
        }catch(err){
            console.log(err)
        }
    }

    return <Tr>
        <Td>{username}</Td>
        <Td>{logs.action}</Td>
        <Td>{logs.date}</Td>
        <Td>{logs.time}</Td>
        <Td><Button size='sm' colorScheme='red' variant='outline' onClick={handleDelete}>Remove</Button></Td>
    </Tr>
};

export default LogsContent;