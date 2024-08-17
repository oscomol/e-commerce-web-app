import { FaCaretDown, FaCheck } from "react-icons/fa";
import { Button, Flex, Badge, Box, Text, Select, Spacer, MenuButton, MenuList, MenuItem, MenuDivider } from "@chakra-ui/react";

import ModalCont from "../../common/ModalContent";
import CheckOutBody from "./CheckOutBody";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useSelector } from "react-redux";
import { selectAllUser } from "../../api/slices/userSlice";
import MenuDropSelect from "../../common/MenuDropSelect";
import { socket } from "../../../socket/socket";

const CheckOut = ({ isLoading, checkedList, setCheckedList, isMax500 }) => {
    const shippingFee = 120;
    const [totalPrize, setTotalPrize] = useState([]);
    const [price, setPrice] = useState(0);

    const [paymentMethod, setPaymentMethod] = useState('');

    const [load, setLoad] = useState(false);

    const [user, setUser] = useState({});
    const { id } = useAuth();
    const users = useSelector(selectAllUser);

    useEffect(() => {
        if (users?.length) {
            const user = users.find(user => user.id === id);
            if (user) {
                setUser(user);
            }
        }

    }, [users, id])


    useEffect(() => {
       if(totalPrize?.length){
        const priceOnly = totalPrize.map(price => price.price);
        setPrice(priceOnly?.length > 1 ? priceOnly.reduce((p1, p2) => p1 + p2) : priceOnly[0]);
       }

       return () => {
        setPrice(0);
       }
    }, [totalPrize])

    const handleNewOrder = async (onClose) => {
        try{
            const initialData = { userID: id, status: 1, shippingFee: 120, productIDs: checkedList, shippingMethod: paymentMethod };
            await socket.emit('newOrder', (initialData));
        }catch(err){
            console.log(err)
        }finally{
            onClose();
            setLoad(false);
            setCheckedList([]);
        }
    }

    const handleCheck = (onOpen) => {
        setTotalPrize([]);
        onOpen()
    }

    return (
        <ModalCont
            btn={(onOpen) => (
                <Button colorScheme='green' leftIcon={isMax500 ? '':<FaCheck />} size='sm' isDisabled={isLoading || !checkedList?.filter(data => data.isAvail)?.length} onClick={()=>handleCheck(onOpen)}>{isMax500 ? <FaCheck />:'Check out'}</Button>
            )}
            size='sm'
            title='Check out'
            body={(onClose) => (
                <>
                    <Badge colorScheme="teal" w='100%' p='10px' textAlign='center'>Delivery attempt 1 to 2 days from now</Badge>
                    <Box p='15px' borderBottom='1px solid lightgray' mb='20px' lineHeight='20px'>
                        <Badge p='0' bg='none'>recepient</Badge>
                        <Text mt='-5px'>{user.username}</Text>
                        <Text>Block {user.blockNo}, {user.sitio}, Barangay {user.barangay},</Text>
                        <Text>{user.city} City, {user.province}</Text>
                        <Text>{user.gmail}</Text>
                        <Text>{user.phone}</Text>
                    </Box>
                    {checkedList.map(wishlist => (
                        <CheckOutBody key={wishlist.id} wishlist={wishlist} setTotalPrize={setTotalPrize} />
                    ))}
                    <Box p='15px' borderBottom='1px solid lightgray' mb='20px' lineHeight='20px'>
                        <Badge bg='none' w='100%'>Shipping Fee: <Text as="span" float='right' mr='10px'>120</Text></Badge>
                        <Flex align='center' mt='7px'>
                            <Badge bg='none' w='100%'>Payment method</Badge>
                            <Spacer />
                            <MenuDropSelect
                                 btn={<MenuButton as={Button} bg='none' rightIcon={<FaCaretDown />} size="sm" w='130px'>
                                 {paymentMethod ? paymentMethod:'Select'}
                             </MenuButton>}
                             body={<MenuList>
                                 <MenuItem onClick={() => setPaymentMethod("COD")}>COD</MenuItem>
                                 <MenuDivider />
                                 <MenuItem onClick={() => setPaymentMethod("GCASH")}>GCASH</MenuItem>
                                 <MenuDivider />
                             </MenuList>}
                            />
                        </Flex>
                    </Box>
                </>
            )}
            footer={(onClose) => (
                <Flex w='100%' mt='30px' p='10px 20px 10px 10px' justify='flex-end' gap='20px' align='center'>
                    <Badge colorScheme="red" fontSize='lg'>Php {price + shippingFee}.00</Badge>
                    <Button size='sm' colorScheme='orange' isDisabled={!paymentMethod || load} onClick={()=>handleNewOrder(onClose)}>{load ? 'Please wait':'Place order'}</Button>
                </Flex>
            )}
        />
    );
};

export default CheckOut;