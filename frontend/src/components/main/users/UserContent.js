import {
    Tr,
    Th,
    Text,
    Flex,
} from '@chakra-ui/react'
import TableCont from '../../common/TableCont';
import { useSelector } from 'react-redux';
import { selectAllUser } from '../../api/slices/userSlice';
import UserById from './UserById';
import { useEffect, useState } from 'react';

const UserContent = () => {
    const users = useSelector(selectAllUser);
    const [sortedUser, setUser] = useState([]);

    useEffect(() => {
        if(users?.length) {
            const sorted = users.slice().sort((u1, u2) => u1.firstname.localeCompare(u2.firstname));
            setUser(sorted);
        }

        return () => {
            setUser([])
        }
    }, [users]);    

    let content;

    if (sortedUser.length) {
        content = <TableCont
            head={<Tr>
                <Th>Name</Th>
                <Th>Contact</Th>
                <Th>Email</Th>
                <Th >Date registered</Th>
                <Th>Action</Th>
            </Tr>}
            body={sortedUser.map(user => (
                <UserById key={user.id} user={user} role={2} />
            ))}
            size='md'
        />
    } else {
        content = <Text>No users found</Text>
    }

    return (
        <Flex p='15px' borderRadius='md' bg='lightgray' justify='center' align='center'>
            {content}
        </Flex>
    );
};

export default UserContent;