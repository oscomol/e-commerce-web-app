import {
    Box,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider, Button
} from '@chakra-ui/react'
import { FaCaretDown } from "react-icons/fa";

import MenuDropSelect from '../../common/MenuDropSelect';

const OrderFilter = ({ selectedOrder, setSelectedOrder }) => {
    const menuList = [
        { status: "Orders", PIN: 0 },
        { status: "Pending", PIN: 1 },
        { status: "Delivered", PIN: 2 },
        { status: "Cancelled", PIN: 3 },
        { status: "Completed", PIN: 4 }]

    const filterOrder = (orderStat) => {
        setSelectedOrder(orderStat);
    }

    return (
        <>
            <MenuDropSelect
                btn={<MenuButton as={Button} bg='none' rightIcon={<FaCaretDown />}>
                    {selectedOrder.status}
                </MenuButton>}
                body={<MenuList>
                    {menuList.map(list => (
                        <Box key={list.PIN}>
                            <MenuItem onClick={() => filterOrder(list)}>{list.status}</MenuItem>
                            <MenuDivider />
                        </Box>
                    ))}
                </MenuList>}
            />
        </>
    );
};

export default OrderFilter;