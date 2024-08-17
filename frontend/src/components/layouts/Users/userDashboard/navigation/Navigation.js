import { VStack, Text, Badge, Flex, Box, Spacer } from "@chakra-ui/react";
import { FaPlane, FaStar, FaOpenid, FaBell, FaChevronDown, FaStore, FaHeart } from "react-icons/fa";
import { FaBagShopping, FaChevronUp, FaHouse, FaMessage, FaCheck, FaXmark } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { container } from "../../../administrator/header/header.style";
import { navsContainer, navsText } from "../../../administrator/navigation/navigation.style";
import NavsLink from "../../../administrator/navigation/NavsLink";
import { useSelector } from "react-redux";
import useAuth from "../../../../../hooks/useAuth";
import { selectAllWishlist } from "../../../../api/users/wishListSlice";
import { getMessages, getNotificaion, getOrder } from "../../../../api/slices/authSliceData";

const UserNavs = ({ closeDrawer }) => {
    const { id } = useAuth();
    const [isMouseOver, setIsMouseOver] = useState(false);
    const [showOrders, setShowOrders] = useState(false);
    const wishLists = useSelector(state => selectAllWishlist(state, id));
    const notifications = useSelector(getNotificaion);
    const orders = useSelector(getOrder);
    const messages = useSelector(getMessages);
    const [unRead, setUnRead] = useState([]);
    const [unOpenNotif, setUnOpenNotif] = useState([]);

    useEffect(() => {
        if (notifications?.length) {
            const unreadMess = notifications.filter(list => list.isOpen == 0 && list.recieverID == "all");
            setUnOpenNotif(unreadMess);
        }
    }, [notifications]);

    useEffect(() => {
        if (messages?.length) {
            const unreadMess = messages.filter(list => list.isSeen == 0 && list.role == 1);
            setUnRead(unreadMess);
        }
    }, [messages]);

    const isInDrawer = () => {
        if (closeDrawer) {
            closeDrawer();
        }
    }

    const orderLength = (stat, orders) => {
        const order = orders.filter(order => order.status === stat);

        return order?.length;
    }

    return (
        <VStack sx={{ ...container, h: '100%', borderRight: '1px solid lightgray', pt: "12px", width: '100%' }}>
            <Box borderBottom='1px solid lightgray' width='100%'>
                <Badge alignSelf='flex-start' bg='none' color='gray' mt='5px' mb='10px' pl='10px'>Main menu</Badge>
                <NavsLink
                    linkText="Home"
                    redirectPIN={1}
                    logo={<FaHouse />}
                    redLink="/dashboard"
                    isMouseOver={isMouseOver}
                    setIsMouseOver={setIsMouseOver}
                    isInDrawer={isInDrawer}
                />
                <NavsLink
                    linkText="Store"
                    redirectPIN={1}
                    logo={<FaStore />}
                    redLink="/dashboard/store"
                    isMouseOver={isMouseOver}
                    setIsMouseOver={setIsMouseOver}
                    isInDrawer={isInDrawer}
                />
            </Box>

            <Box width="100%" borderBottom='1px solid lightgray'>
                <Badge bg='none' alignSelf='flex-start' color='gray' mt='5px' mb='10px' pl='10px'>Information</Badge>
                <NavsLink
                    linkText="Messages"
                    amt={unRead?.length}
                    redirectPIN={3}
                    logo={<FaMessage />}
                    redLink="/dashboard/message"
                    isMouseOver={isMouseOver}
                    setIsMouseOver={setIsMouseOver}
                    isInDrawer={isInDrawer}
                />
                <NavsLink
                    linkText="Notification"
                    redirectPIN={4}
                    amt={unOpenNotif?.length}
                    logo={<FaBell />}
                    redLink="/dashboard/notification"
                    isMouseOver={isMouseOver}
                    setIsMouseOver={setIsMouseOver}
                    isInDrawer={isInDrawer}
                />
            </Box>

            <Box width='100%'>
                <Badge alignSelf='flex-start' color='gray' pl='10px' bg='none' mt='5px' mb='10px'>Transactions</Badge>
                <NavsLink
                    linkText="Wishlist"
                    amt={wishLists?.length}
                    redirectPIN={5}
                    logo={<FaHeart />}
                    redLink="/dashboard/wishlist"
                    isMouseOver={isMouseOver}
                    setIsMouseOver={setIsMouseOver}
                    isInDrawer={isInDrawer}
                />
                <Flex sx={{ ...navsContainer, position: 'relative' }} onClick={() => setShowOrders(!showOrders)}>
                    {orders?.length > 0 && <Flex justify='center' align='center' w='25px' h='25px' borderRadius='50%' bg='red.300' position='absolute' top={0} left={4}>
                        <Text fontWeight='bold' color='white' fontSize='sm'>{orders?.length}</Text>
                    </Flex>}
                    <Text><FaBagShopping /></Text>
                    <Text sx={navsText}>Orders</Text>
                    <Spacer />
                    <Text>{showOrders ? <FaChevronUp /> : <FaChevronDown />}</Text>
                </Flex>

                {showOrders && <Box paddingInline='20px'>
                    <NavsLink
                        linkText="Pending"
                        amt={orderLength(1, orders) ?? ''}
                        redirectPIN={6}
                        logo={<FaOpenid />}
                        redLink="/dashboard/order/pending"
                        isMouseOver={isMouseOver}
                        setIsMouseOver={setIsMouseOver}
                        isInDrawer={isInDrawer}
                    />
                    <NavsLink
                        linkText="Delivered"
                        redirectPIN={7}
                        amt={orderLength(2, orders) ?? ''}
                        logo={<FaPlane />}
                        redLink="/dashboard/order/delivered"
                        isMouseOver={isMouseOver}
                        setIsMouseOver={setIsMouseOver}
                        isInDrawer={isInDrawer}
                    />
                    <NavsLink
                        linkText="Cancelled"
                        redirectPIN={8}
                        amt={orderLength(3, orders) ?? ''}
                        logo={<FaXmark />}
                        redLink="/dashboard/order/cancelled"
                        isMouseOver={isMouseOver}
                        setIsMouseOver={setIsMouseOver}
                        isInDrawer={isInDrawer}
                    />
                    <NavsLink
                        linkText="Completed"
                        redirectPIN={9}
                        amt={orderLength(4, orders) ?? ''}
                        logo={<FaCheck />}
                        redLink="/dashboard/order/completed"
                        isMouseOver={isMouseOver}
                        setIsMouseOver={setIsMouseOver}
                        isInDrawer={isInDrawer}
                    /></Box>}
            </Box>

        </VStack>
    )

}

export default UserNavs;