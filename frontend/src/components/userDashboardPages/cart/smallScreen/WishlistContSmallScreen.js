import { Flex } from '@chakra-ui/react';
import React from 'react';
import PerWishList2 from './PerWishList';

const WishlistContSmallScreen = ({setCheckedList, wishlist}) => {

    return (
       <Flex flexDir='column' gap='40px'>
        {wishlist.map(wishlist => (
            <PerWishList2 key={wishlist.id} wishlist={wishlist} setCheckedList={setCheckedList} />
        ))}
       </Flex>
    );
};

export default WishlistContSmallScreen;