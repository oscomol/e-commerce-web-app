import {
    MenuButton,
    MenuList,
    MenuItem,
    Box,
    MenuDivider, Button
} from '@chakra-ui/react'
import { FaCaretDown } from "react-icons/fa";
import MenuDropSelect from "../../../common/MenuDropSelect";
import { useState } from "react";

const Category = ({selected, setSelected}) => {
    const categories =  [
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

    const changeCategory = (category) => {
        setSelected(category)
    }

    return (
        <MenuDropSelect
                btn={<MenuButton as={Button} bg='none' rightIcon={<FaCaretDown />}>
                    {selected}
                </MenuButton>}
                body={<MenuList h='70vh' overflowY='auto'>
                    {categories.map(category => (
                        <Box  key={category} onClick={()=>changeCategory(category)}>
                            <MenuItem onClick={() => setSelected(category)}>{category}</MenuItem>
                            <MenuDivider/>
                        </Box>
                    ))}
                </MenuList>}
            />
    );
};

export default Category;