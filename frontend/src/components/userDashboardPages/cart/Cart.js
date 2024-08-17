import React, { useState } from 'react';
import { Box, Button, HStack, useMediaQuery, Flex, Img, Badge } from '@chakra-ui/react';

import Main from '../../main/Main';
import WishListContent from './WishListContent';
import WishlistContSmallScreen from './smallScreen/WishlistContSmallScreen';
import { selectAllWishlist, useDeleteWishlistMutation } from '../../api/users/wishListSlice';
import { FaTrashAlt } from 'react-icons/fa';
import CheckOut from './CheckOut';
import { useSelector } from 'react-redux';
import useAuth from '../../../hooks/useAuth';

const Cart = () => {
    const [isMax1000, isMax500] = useMediaQuery(['(max-width: 700px)', '(max-width: 500px)']);
    const [checkedList, setCheckedList] = useState([]);
    const { id } = useAuth();
    const wishlist = useSelector(state => selectAllWishlist(state, id));

    const [deleteWishlist, { isLoading }] = useDeleteWishlistMutation();

    const handleDelete = async () => {
        try {
            const id = checkedList.map(id => id.id);
            const res = await deleteWishlist({ id }).unwrap();
        } catch (err) {
            console.log(err)
        } finally {
            setCheckedList([]);
        }
    }

    let content;
    if (wishlist?.length) {
        content = <Box p='30px'>
            {isMax1000 ? <WishlistContSmallScreen setCheckedList={setCheckedList} wishlist={wishlist} /> : <WishListContent setCheckedList={setCheckedList} wishlist={wishlist} />}
        </Box>
    } else {
        content = <Flex w='100%' flexDir='column' align='center' gap='10px' mt='120px'>
            <Img src='/photos/order/noProduct.webp' w='150px' h='150px' />
            <Badge fontSize='x-large' bg='none'>No items on cart</Badge>
        </Flex>
    }
    
    return (
        <>
            <Main
                otherBtn={<HStack>
                    <CheckOut isLoading={isLoading} checkedList={checkedList} setCheckedList={setCheckedList} isMax500={isMax500}/>
                    <Button colorScheme='red' leftIcon={isMax500 ? '':<FaTrashAlt />} size='sm' onClick={handleDelete} isDisabled={isLoading || !checkedList?.length}>{isMax500 ? <FaTrashAlt />:'Delete'}</Button>
                </HStack>}
            />
            {content}
        </>
    );
};

export default Cart;