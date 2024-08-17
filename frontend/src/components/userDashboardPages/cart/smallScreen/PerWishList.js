import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper, Checkbox, Flex, Img, Text,
    Badge
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getProducts } from '../../../api/slices/authSliceData';
import { useSelector } from 'react-redux';
import { useUpdateWishlistMutation } from '../../../api/users/wishListSlice';

const PerWishList2 = ({ wishlist, setCheckedList }) => {
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
            setCheckedList(prev => [...prev, { id: wishlist.id, productID: wishlist.productID, quantity, price: wishlists.discountedPrice ? wishlists.discountedPrice : wishlists.storePrice, isAvail: wishlists?.stock > 0 }])
        } else {
            setCheckedList(prev => prev.filter(prev => prev.id !== wishlist.id))
        }

    }, [isChecked])

    const handleCheck = (e) => {
        setIsChecked(e.target.checked)
    }

    const handleChange = (e) => {
        if (wishlists.stock > 0) {
            setQuantity(e)
        }
    }

    return (
        <Flex align='center' gap='20px' borderBottom='1px solid lightgray' pb='10px'>
             <Checkbox border={`1px solid ${wishlists?.stock > 0 ? 'green':'lightgray'}`} colorScheme='green'  mb='20px'  isChecked={isChecked} onChange={handleCheck} />
            <Img src={`http://localhost:3500/product/${wishlists?.filename}`} w='100px' h='100px' alignSelf='flex-start' />
            <Flex flexDir='column' lineHeight={5}>
                <Text fontWeight='bold' mt='-15px'>{wishlists.brand}</Text>
                <Text mb='4px'>{wishlists.description}</Text>

                <NumberInput step={1} onChange={handleChange} value={quantity} min={1} max={100} w='100px' border='1px solid lightgray' size='sm'>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>

                <Flex gap='10px' align='center' mt='5px'>
                    <Badge colorScheme={wishlists?.discountedPrice > 0 ? 'none':'red'} textDecor={wishlists?.discountedPrice > 0 ? 'line-through':'normal'}>{wishlists.storePrice}</Badge>
                    {wishlists?.discountedPrice > 0 && <Badge colorScheme='red'>{wishlists.discountedPrice}</Badge>}
                </Flex>
            </Flex>
        </Flex >
    );
};

export default PerWishList2;