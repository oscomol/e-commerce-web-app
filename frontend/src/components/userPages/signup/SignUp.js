import { useEffect, useState } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import FirstData from "./FirstData";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import AddressForm from "./AddressForm";
import UserAndPass from "./UserAndPass";
import { useCreateUserMutation } from "../../api/slices/userSlice";
import { setCredentials } from "../../api/slices/authSliceData";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";

const SignUp = ({w, onClose}) => {
    const [createUser, { isLoading }] = useCreateUserMutation();

    const [page, setPage] = useState(1);
    const [isNextActive, setiSNextActive] = useState(false);

    //Personal data 
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [mName, setMName] = useState("");
    const [gmail, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [bday, setBday] = useState("");

    //Address
    const [block, setBlock] = useState('');
    const [sitio, setSitio] = useState('');
    const [city, setCity] = useState('');
    const [barangay, setBarangay] = useState('');
    const [province, setProvince] = useState('');

    //Username and password
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    let content;
    if (page === 1) {
        content = <FirstData {...{ fName, setFName, lName, setLName, mName, setMName, gmail, setEmail, phone, setPhone, bday, setBday, setiSNextActive }} />
    } else {
        if (page === 2) {
            content = <AddressForm {...{ block, setBlock, sitio, setSitio, city, setCity, barangay, setBarangay, province, setProvince, setiSNextActive }} />
        } else {
            content = <UserAndPass {...{ username, setUsername, password, setPassword, setiSNextActive }} />
        }
    }

    const handleNext = () => {
        setPage(prev => prev + 1);
    }

    const handlePrev = () => {
        setPage(prev => prev - 1);
    }

    const handleNewUser = async () => {
        const personalData = { firstname: fName, lastname: lName, middlename: mName, gmail, phone, bday, role: w ? 1:2 };
        const addressData = { blockNo: block, sitio, barangay, city, province };
        const authetication = { username, password };
        const initialData = { ...personalData, ...addressData, ...authetication };
        try {
            const res = await createUser(initialData).unwrap();
            if (res && personalData.role == 2) {
                dispatch(setCredentials(res.accesToken))
                navigate('/dashboard');
            }else{
                onClose();
            }
        } catch (err) {
            console.log(err);
        } finally {
            console.log("DONE")
        }
    }

    return (
        <Flex w='100%' h='auto' justify='center' mt={w ? 0:'90px'}>
            <Flex w={w ?? '50%'} p={w ? 0:'30px'} borderRadius='md' flexDir='column' align='center' gap='25px' boxShadow={w ? 'none':'rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px;'}>
                <Text fontSize='xl'>{page === 1 ? 'Persona data' : page === 2 ? 'Address' : 'Username and Password'}</Text>
                {content}
                <Flex justify='space-between' w='100%'>
                    <Button leftIcon={<FaChevronLeft />} colorScheme="green" variant="ghost" justifySelf='flex-end' isDisabled={page < 2 || isLoading} onClick={handlePrev}>Prev</Button>
                    {
                        page > 2 ? <Button colorScheme="green" variant="ghost" justifySelf='flex-end' isDisabled={!isNextActive || isLoading} onClick={handleNewUser}>Submit</Button> :
                            <Button colorScheme="green" variant="ghost" justifySelf='flex-end' onClick={handleNext} rightIcon={<FaChevronRight />} isDisabled={!isNextActive}>Next</Button>
                    }
                </Flex>
            </Flex>
        </Flex>
    );
};

export default SignUp;
