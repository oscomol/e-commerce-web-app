import React, { useState } from 'react';
import {
    MenuButton,
    MenuList,
    MenuItem,
    Box,
    MenuDivider, Button
} from '@chakra-ui/react'
import { FaCaretDown } from "react-icons/fa";

import MenuDropSelect from '../../common/MenuDropSelect';

const SelectCategory = ({selected, setSelected}) => {
    const category = [
        "Category(All)",
        "Electronics",
        "Clothing",
        "Home",
        "Health",
        "Sports",
        "Books",
        "Pet",
        "Beauty",
        "Food",
        "Outdoor",
        "Art",
        "Travel",
        "Games",
        "Accessories",
        "Tech",
        "Decor",
        "Fitness",
        "Stationery",
        "Snacks",
        "Sustainability",
        "Crafts",
        "DIY",
        "Subscriptions"
    ]

    return (
        <>
            <MenuDropSelect
                btn={<MenuButton as={Button} bg='none' rightIcon={<FaCaretDown />}>
                    {selected}
                </MenuButton>}
                body={<MenuList h='70vh' overflowY='auto'>
                    {category.map(category => (
                        <Box  key={category}>
                            <MenuItem onClick={() => setSelected(category)}>{category}</MenuItem>
                            <MenuDivider/>
                        </Box>
                    ))}
                </MenuList>}
            />
        </>
    );
};

export default SelectCategory;