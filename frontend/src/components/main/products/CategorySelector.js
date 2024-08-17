import { Flex, Text, Img, Box } from "@chakra-ui/react";
import { useState } from "react";

import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const CategorySelector = ({ value, setValue }) => {
    const [isSelecting, setIsSelecting] = useState(false);
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

    const setCategoryValue = (category) => {
        setValue(category);
        setIsSelecting(false);
    }

    return (
        <>
            <Flex border='1px solid teal' padding='11px 25px 11px 25px' borderRadius='md' align='center' justify='space-between' position='relative' w='100%' onClick={() => setIsSelecting(!isSelecting)}>
                <Text color={value ? 'black':'gray'}>{value ? value:"Select a category"}</Text>
                <Text>{isSelecting ? <FaCaretUp /> : <FaCaretDown />}</Text>
                <Text color='gray' position='absolute' top='-13px' bg='white' paddingInline='5px' left='15px' display={value === '' ? 'none' : 'visible'}>Selected category</Text>
            </Flex>
            {isSelecting && <Box h='150px' overflowY='auto' cursor='pointer'>
                {category.map(category => (
                <Text key={category} p='5px 10px 5px 10px' _hover={{bg: "lightgray"}} onClick={()=>setCategoryValue(category)}>{category}</Text>
            ))}
            </Box>}
        </>
    );
};

export default CategorySelector;