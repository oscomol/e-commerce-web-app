import { FaUser } from 'react-icons/fa';

import DashSummary from './common/DashSummary';
import { useSelector } from 'react-redux';
import { selectAllUser } from '../../../api/slices/userSlice';
import { useEffect, useState } from 'react';

const Users = () => {
    const users = useSelector(selectAllUser);
    const [active, setActive] = useState('');

    useEffect(() => {
        if(users?.length){
            const user = users.filter(user => user.role === 2);
            setActive(user.length)
        }
    }, [users]);

    return (
        <DashSummary
        icon={<FaUser />}
        color="red.300"
        helperText="Total number of users"
        title="Active users"
        data={active}
        />
    );
};

export default Users;