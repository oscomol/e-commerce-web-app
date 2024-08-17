import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllproduct, useCheckQuantityMutation } from '../../api/slices/productSlice';
import { Flex, Box, Img, Text, Badge, NumberInputField, NumberInput, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Spacer } from '@chakra-ui/react';

const CheckOutBody = ({ wishlist, setTotalPrize, onlyRead, shippingMethod }) => {
    const product = useSelector(selectAllproduct);
    const [toCheckOut, setToCheckOut] = useState({});
    const [quantity, setQuantity] = useState(wishlist?.quantity);
    const [checkQuantity] = useCheckQuantityMutation();
    const [avail, setAvail] = useState(0);

    const checkingQ = async (id) => {
        try {
            const res = await checkQuantity({ id }).unwrap();
            if (res) {
                const isOrderGood = res.stock <= quantity;
                setAvail(res.stock);
                if (isOrderGood) {
                    setQuantity(res.stock)
                }
            }
        } catch (err) { }
    }

    useEffect(() => {
        if (wishlist?.productID && !shippingMethod) {
            checkingQ(wishlist.productID)
        }
    }, [wishlist?.productID, shippingMethod]);

    useEffect(() => {
        const getProduct = product.find(product => product.id === wishlist.productID);
        if (getProduct) {
            setToCheckOut(getProduct);
        }

        return () => {
            setToCheckOut({});
        }
    }, [product?.length]);

    useEffect(() => {
        
        if (toCheckOut?.storePrice) {
            let price;
            if (toCheckOut.discountedPrice) {
                price = toCheckOut.discountedPrice * quantity;
            } else {
                price = toCheckOut.storePrice * quantity;
            }
            setTotalPrize(prev => {
                const newPrev = prev.filter(prev => prev.id !== toCheckOut.id);
                console.log([{ id: toCheckOut.id, price }, ...newPrev])
                return [{ id: toCheckOut.id, price }, ...newPrev]
            });
        }
        if (!onlyRead) wishlist.quantity = quantity;

    }, [quantity, toCheckOut?.id]);

    const handleChange = (e) => {
        if (!onlyRead) {
            if (e <= avail) {
                setQuantity(e);
            }
        }
    }

    return (
        <Flex gap='15px' mb='20px' p='15px' borderBottom='1px solid lightgray'>
            <Box>
                <Img src={`http://localhost:3500/product/${toCheckOut?.filename}`} w='100px' h='93px' />
            </Box>
            <Flex flexDir='column' lineHeight='20px'>
                <Badge bg='none' fontSize='lg' p='0'>{toCheckOut.brand}</Badge>
                <Text>{toCheckOut?.description?.length > 21 ? toCheckOut.description.slice(0, 21) + '...' : toCheckOut.description}</Text>
                <Text textDecor={toCheckOut.discountedPrice ? 'line-through' : 'none'}>{toCheckOut.storePrice} {toCheckOut.discountedPrice && <Badge ml='10px' colorScheme='red'>{toCheckOut.discountedPrice}</Badge>}</Text>
                {
                    shippingMethod ? 
                    <Flex>
                        <Badge colorScheme='white' fontSize='sm' p='0'>Quantity</Badge>
                        <Spacer/>
                        <Badge colorScheme='green' fontSize='md' p='0'>{quantity}</Badge>
                    </Flex>:
                    <NumberInput size='xs' mt='8px' onChange={handleChange} value={quantity} min={1}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                }
            </Flex>
        </Flex>
    );
};

export default CheckOutBody;