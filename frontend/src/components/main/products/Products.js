import { Box, HStack, MenuItem, MenuButton, Button, MenuList, useMediaQuery, MenuDivider } from "@chakra-ui/react";

import Main from "../Main";
import ProductContent from "./ProductContent";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectAllproduct } from "../../api/slices/productSlice";
import { AddIcon } from "@chakra-ui/icons";
import AddItem from "./AddItem";
import MenuDropSelect from "../../common/MenuDropSelect";
import { FaCaretDown } from "react-icons/fa";

const Products = () => {
  const [isMax600] = useMediaQuery('(max-width: 600px)')
  const [isSelected, setIsSelected] = useState("Category");
  const category = [
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

  let content;

  return (
    <>
      <Main
        title="Products"
        otherBtn={
          <HStack gap='2'>
            <MenuDropSelect
              btn={<MenuButton as={Button} colorScheme="green" variant='outline' rightIcon={<FaCaretDown />} size='sm'>
                {isSelected}
              </MenuButton>}
              body={<MenuList>
                {category.map(list => (
                  <>
                    <MenuItem key={list} onClick={() => setIsSelected(list)}>
                      {list}
                    </MenuItem>
                    <MenuDivider />
                  </>
                ))}
              </MenuList>}
            />
             <AddItem />
          </HStack>
        }
      />
      <Box p={isMax600 ? '15px' : '30px'} w='100%'>
        <ProductContent isSelected={isSelected} />
      </Box>
    </>
  );
};

export default Products;