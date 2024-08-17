import { FaCaretDown, FaCheck } from "react-icons/fa";
import { Button, Flex, Badge, Box, Text, Select, Spacer, MenuButton, MenuList, MenuItem, MenuDivider } from "@chakra-ui/react";

import ModalCont from "../../common/ModalContent";
import CheckOutBody from "../cart/CheckOutBody";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useSelector } from "react-redux";
import { selectAllUser } from "../../api/slices/userSlice";
import MenuDropSelect from "../../common/MenuDropSelect";
import { useNavigate } from "react-router-dom";

const ShowOrder = ({ checkedList, footerBtn, tag, userID, setFound, shippingMethod, trackingID }) => {
    const shippingFee = 120;
    const [totalPrize, setTotalPrize] = useState([]);
    const [price, setPrice] = useState(0);

    const [paymentMethod, setPaymentMethod] = useState('');

    const [user, setUser] = useState({});
    const { id, role } = useAuth();
    const users = useSelector(selectAllUser);

    const navigate = useNavigate();

    useEffect(() => {
        if (users?.length) {
            const user = users.find(user => user.id === (userID ? userID : id));
            if (user) {
                setUser(user);
                if (setFound) {
                    setFound(false)
                }
            } else {
                if (setFound) {
                    setFound(true)
                }
            }
        }

        return () => {
            setUser({});
        }
    }, [users, id, userID])


    useEffect(() => {
        const priceOnly = totalPrize.map(price => price.price);
        setPrice(priceOnly?.length > 1 ? priceOnly.reduce((p1, p2) => p1 + p2) : priceOnly[0])
    }, [totalPrize]);

    // const messageWOrder = (trackingID) => {
    //     navigate(`mess/message/${trackingID}`)
    // }

    return (
        <ModalCont
            btn={(onOpen) => (
                <Button size='sm' colorScheme='green' variant="ghost" onClick={onOpen}>View</Button>
            )}
            size='sm'
            title={trackingID ?? 'Check out'}
            body={(onClose) => (
                <>
                    <Badge colorScheme={user?.id ? tag.color : 'red'} w='100%' p='10px' textAlign='center'>{user?.id ? tag.label : 'Recipient not found'}</Badge>
                    {user.id && <Box p='15px' borderBottom='1px solid lightgray' mb='20px' lineHeight='20px'>
                        <Badge p='0' bg='none'>recepient</Badge>
                        <Text mt='-5px'>{user.username}</Text>
                        <Text>Block {user.blockNo}, {user.sitio}, Barangay {user.barangay},</Text>
                        <Text>{user.city} City, {user.province}</Text>
                        <Text>{user.gmail}</Text>
                        <Text>{user.phone}</Text>
                    </Box>}
                    {checkedList.map(wishlist => (
                        <CheckOutBody key={wishlist.id} wishlist={wishlist} setTotalPrize={setTotalPrize} onlyRead={true} shippingMethod={shippingMethod} />
                    ))}
                    <Box p='15px' borderBottom='1px solid lightgray' mb='20px' lineHeight='20px' height='120px'>
                        <Flex>
                            <Badge bg='none' w='100%'>Shipping Fee </Badge>
                            <Spacer />
                            <Badge colorScheme="red">120</Badge>
                        </Flex>
                        <Flex align='center' mt='7px'>
                            <Badge bg='none' w='100%'>Payment method</Badge>
                            <Spacer />
                            {shippingMethod ? <Badge colorScheme="green">{shippingMethod}</Badge> : <MenuDropSelect
                                btn={<MenuButton as={Button} bg='none' rightIcon={<FaCaretDown />} size="sm" w='130px'>
                                    {paymentMethod ? paymentMethod : 'Select'}
                                </MenuButton>}
                                body={<MenuList>
                                    <MenuItem onClick={() => setPaymentMethod("COD")}>COD</MenuItem>
                                    <MenuDivider />
                                    <MenuItem onClick={() => setPaymentMethod("GCASH")}>GCASH</MenuItem>
                                    <MenuDivider />
                                </MenuList>}
                            />}
                        </Flex>
                    </Box>
                </>

            )}
            footer={(onClose) => (
                <Flex w='100%' mt='30px' p='10px 20px 10px 10px' justify='flex-end' gap='20px' align='center'>
                    <Badge colorScheme="red" fontSize='lg'>Php {price + shippingFee}.00</Badge>
                    {footerBtn(onClose)}
                </Flex>
            )}
        />
    );
};

export default ShowOrder;