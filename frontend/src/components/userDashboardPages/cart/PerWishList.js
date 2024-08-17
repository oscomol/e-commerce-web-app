import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper, Tr, Td, Img, Text, Checkbox, Flex, HStack
} from "@chakra-ui/react";
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useUpdateWishlistMutation } from "../../api/users/wishListSlice";
import { getProducts } from "../../api/slices/authSliceData";

const PerWishList = ({ wishlist, setCheckedList }) => {
    const [quantity, setQuantity] = useState(wishlist?.quantity ?? 1);
    const [isChecked, setIsChecked] = useState(false);
    const products = useSelector(getProducts);
    const [wishlists, setWishlist] = useState({});

    const [updateWishlist] = useUpdateWishlistMutation();

    useEffect(() => {
        const item = products.find(product => product.id === wishlist.productID);
        if (item) {
            setWishlist({ ...item, quantity: wishlist?.quantity })
        }
    }, [products]);

    useEffect(() => {
        const changeWishlist = async (initialData) => {
            try {
                await updateWishlist(initialData).unwrap();
            } catch (err) {
                alert(err?.data?.msg)
            }
        }
        changeWishlist({ id: wishlist?.id, quantity });

        if (isChecked) {
            setCheckedList(prev => prev.map(prev => {
                if (prev.id === wishlist.id) {
                    prev.quantity = quantity;
                }
                return prev;
            }))
        }
    }, [quantity]);

    useEffect(() => {
        if (isChecked) {
            setCheckedList(prev => [...prev, { id: wishlist.id, productID: wishlist.productID, quantity, price: wishlists.discountedPrice ?  wishlists.discountedPrice: wishlists.storePrice, isAvail: wishlists?.stock > 0}])
        } else {
            setCheckedList(prev => prev.filter(prev => prev.id !== wishlist.id))
        }

    }, [isChecked])

    const handleCheck = (e) => {
        setIsChecked(e.target.checked)
    }

    const handleChange = (e) => {
        if(wishlists.stock > 0){
            setQuantity(e)
        }
    }

    return (
        <Tr>
            <Td>
                <Flex align='center' gap='15px'>
                    <Checkbox border={`1px solid ${wishlists?.stock > 0 ? 'green':'lightgray'}`} colorScheme='green' isChecked={isChecked} onChange={handleCheck} />
                    <Img src={`http://localhost:3500/product/${wishlists?.filename}`} w='50px' h='50px' />
                </Flex>
            </Td>
            <Td>{wishlists?.brand}</Td>
            <Td>
                {wishlists?.description?.length > 25 ? wishlists.description.slice(0, 26) + "..." : wishlists.description}
            </Td>
            <Td>
                <HStack>
                    <Text textDecor={wishlists?.discountedPrice ? 'line-through' : 'none'}>Php {wishlists.storePrice}.00</Text>
                    {wishlists.discountedPrice && <Text as="span" color="red" fontWeight="bold" textDecor='none'>Php {wishlists.discountedPrice}.00 </Text>}
                </HStack>
            </Td>
            <Td>
                <NumberInput step={1} onChange={handleChange} value={quantity} min={1} max={100} w='100px' border='1px solid lightgray'>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </Td>
        </Tr>
    );
};

export default PerWishList;