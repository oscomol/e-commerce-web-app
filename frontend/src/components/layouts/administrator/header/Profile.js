import {
    Text,
    Button,
    Avatar,
    Box,
    Flex
} from '@chakra-ui/react'
import { FaUserCircle } from 'react-icons/fa';

import PopOverCont from '../../../common/PopOverCont';
import { useLogoutMutation } from '../../../api/slices/authApiSlice';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';
import ModalCont from '../../../common/ModalContent';
import UserEdit from '../../../common/UserEdit';
import { socket } from '../../../../socket/socket';

const Profile = () => {
    const [logout, { isLoading }] = useLogoutMutation();

    const { username, isAdmin } = useAuth();

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const res = await logout().unwrap();
            if (res?.message === "logout") {
                socket.disconnect();
                navigate("/");
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <PopOverCont
                btn={<Button bg="none"><FaUserCircle /></Button>}
                body={<Box h='auto' p='15px' >
                    <Flex flexDirection='column' align='center' border='1px solid lightgray' cursor='default'>
                        <Flex flexDirection='column' align='center' p='15px' gap='5'>
                            <Avatar size='2xl' name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                            <Text mt='-15px'>{username}</Text>
                            {isAdmin && <Box p='10px 20px 10px 20px' border='1px solid green' textAlign='center'>
                                <Text color='green'>Administrator</Text>
                            </Box>}
                        </Flex>

                        <ModalCont
                            btn={(onOpen) => (
                                <Box p='10px' borderTop='1px solid lightgray' textAlign='center' width='100%' _hover={{ background: 'lightgray', fontWeight: 'bold' }} onClick={onOpen}>
                                    <Text>View profile</Text>
                                </Box>
                            )}
                            title="User settings"
                            size="lg"
                            body={(onClose) => <UserEdit onClose={onClose} />}
                            // footerP={true}
                        />

                        <Box p='10px' borderTop='1px solid lightgray' textAlign='center' width='100%' onClick={handleLogout} _hover={{ background: 'lightgray', fontWeight: 'bold' }} >
                            <Text>{isLoading ? "Logging out..." : "Sign out"}</Text>
                        </Box>
                    </Flex>
                </Box>}
            />
        </>
    );
};

export default Profile;