import { VStack, Text, Badge, Divider, Box } from "@chakra-ui/react";
import {FaArchive, FaCartPlus, FaMicrosoft, FaUser, FaMapMarker, FaTable, FaStar} from "react-icons/fa";
import { FaNoteSticky } from "react-icons/fa6";
import {useState} from "react";

import { container } from "./navigation.style";
import NavsLink from "./NavsLink";
import { FaUsers } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { getOrder } from "../../../api/slices/authSliceData";

const Navigation = ({closeDrawer}) => {
    const [isMouseOver, setIsMouseOver] = useState(false);
    const orders = useSelector(getOrder)
    
    const isInDrawer = () => {
        if(closeDrawer){
            closeDrawer();
        }
    }

return (
    <VStack sx={container}>
        <Box borderBottom='1px solid lightgray' width='100%'>
            <Badge alignSelf='flex-start' bg='none' color='gray'  mt='5px' mb='10px'  pl='10px'>Main menu</Badge>
            <NavsLink
                linkText="Dashboard"
                redirectPIN={1}
                logo={<FaMicrosoft />}
                redLink="/admin"
                isMouseOver={isMouseOver}
                setIsMouseOver={setIsMouseOver}
                isInDrawer={isInDrawer}
            />
        </Box>

        <Box borderBottom='1px solid lightgray' width='100%'>
        <Badge alignSelf='flex-start' color='gray' pl='10px' bg='none' mt='5px' mb='10px'>Products & transactions</Badge>
        <NavsLink
            linkText="Products"
            redirectPIN={2}
            logo={<FaArchive/>}
            redLink="/admin/products"
            isMouseOver={isMouseOver}
            setIsMouseOver={setIsMouseOver}
            isInDrawer={isInDrawer}
        />
        <NavsLink
            linkText="Orders"
            redirectPIN={3}
            amt={orders?.length}
            logo={<FaCartPlus/>}
            redLink="/admin/orders"
            isMouseOver={isMouseOver}
            setIsMouseOver={setIsMouseOver}
            isInDrawer={isInDrawer}
        />
        </Box>
        <Box width="100%" borderBottom="1px solid lightgray">
        <Badge bg='none' alignSelf='flex-start' color='gray' mt='5px' mb='10px' pl='10px'>About sales</Badge>
        <NavsLink
            linkText="Statistics"
            redirectPIN={4}
            logo={<FaTable/>}
            redLink="/admin/statistics"
            isMouseOver={isMouseOver}
            setIsMouseOver={setIsMouseOver}
            isInDrawer={isInDrawer}
        />
         <NavsLink
            linkText="Inventory"
            redirectPIN={5}
            logo={<FaMapMarker/>}
            redLink="/admin/inventory"
            isMouseOver={isMouseOver}
            setIsMouseOver={setIsMouseOver}
            isInDrawer={isInDrawer}
        />
        </Box>
        <Box width="100%">
        <Badge bg='none' alignSelf='flex-start' color='gray' mt='5px' mb='10px' pl='10px'>Persons</Badge>
        <NavsLink
            linkText="Users"
            redirectPIN={6}
            logo={<FaUser/>}
            redLink="/admin/users"
            isMouseOver={isMouseOver}
            setIsMouseOver={setIsMouseOver}
            isInDrawer={isInDrawer}
        />
        <NavsLink
            linkText="Administrators"
            redirectPIN={7}
            logo={<FaUsers/>}
            redLink="/admin/admins"
            isMouseOver={isMouseOver}
            setIsMouseOver={setIsMouseOver}
            isInDrawer={isInDrawer}
        />
        <NavsLink
            linkText="Acitivity logs"
            redirectPIN={9}
            logo={<FaNoteSticky/>}
            redLink="/admin/logs"
            isMouseOver={isMouseOver}
            setIsMouseOver={setIsMouseOver}
            isInDrawer={isInDrawer}
        />
        </Box>
    </VStack>
)

}

export default Navigation;