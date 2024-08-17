import { GridItem, Image, Text, Flex, Spacer, Card, CardBody, Stack, HStack, useMediaQuery } from "@chakra-ui/react";
import { FaCartPlus, FaHeart, FaShare, FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectAllWishlist } from "../../api/users/wishListSlice";
import { useCreateWishlistMutation, useDeleteWishlistMutation } from "../../api/users/wishListSlice";

import useAuth from "../../../hooks/useAuth";
import SingleProduct from "./SingleProduct";
import { useEffect, useState } from "react";

const Product = ({ showBtn, product }) => {
    const [isMax450] = useMediaQuery('(min-width: 500px)');
    const { id } = useAuth();
    const [deleteWishlist] = useDeleteWishlistMutation();
    const [createWishlist] = useCreateWishlistMutation();
    const wishlists = useSelector((state) => selectAllWishlist(state, id));
    const [toSlice, setToSlice] = useState(25);

    useEffect(() => {
        if(isMax450){
             setToSlice(25)
        }else{
            setToSlice(12)
        }
    }, [isMax450])

    const checkWishlist = (id) => {
        const isOnWishList = wishlists.find(wishlist => wishlist.productID === id);
        if (!isOnWishList) {
            return
        }
        return isOnWishList;
    }

    const handleWishList = async () => {
        try {
            const onWishList = checkWishlist(product.id);
            if (onWishList) {
                await deleteWishlist({ id: [onWishList.id] }).unwrap();
            } else {
                await createWishlist({ productID: product.id, userID: id, quantity: 1 }).unwrap();
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <GridItem border='1px solid lightgray' borderRadius='lg' filter={product.stock < 1 && 'auto'} brightness={product.stock < 1 && '80%'}>
            <Card maxW='sm'>
                <CardBody p={`15px 15px ${showBtn ? '10px' : '15px'} 15px`} >
                    <SingleProduct
                        btnBTN={(onOpen) => (
                            <Image
                                src={`http://localhost:3500/product/${product.filename}`}
                                alt='Green double couch with wooden legs'
                                borderRadius='lg'
                                width="100%"
                                height={isMax450 ? "160px":"120px"}
                                filter={product.stock < 1 && 'auto'}
                                blur={product.stock < 1 && '2px'}
                                onClick={onOpen}
                            />
                        )}
                        product={product}
                    />

                    <Stack mt='6' spacing='0'>
                        <Text fontWeight='bold' fontSize={isMax450 ? 'md':'lg'} mt='-15px'>{product.brand}
                            <Text as="span" float='right' fontSize='13px' pt='6px' onClick={handleWishList} color={checkWishlist(product.id)?.id ? 'red.500' : 'gray'}>
                                <FaHeart />
                            </Text>
                        </Text>
                        <Text fontSize='sm'>
                            {product.description.length > toSlice ? `${product.description.slice(0, toSlice)}...` : product.description}
                        </Text>
                        <Text fontSize='md' fontWeight='bold' color={product.discountedPrice ? 'red' : 'black'} textDecor={product.discountedPrice ? 'line-through' : 'none'}>
                            {product.storePrice}
                            {product.discountedPrice && <Text as='span' float='right' color='black' textDecor='none'>{product.discountedPrice}</Text>}
                        </Text>
                        <Flex flexDir={!isMax450 ? 'column':'row'} justify='space-between'>
                            <Text fontSize='13px' color="gray">Stock: {product.stock}</Text>
                            <HStack gap='1'>
                                <Text fontSize='sm' color={product.rate >= 1 && 'orange'}><FaStar /></Text>
                                <Text fontSize='sm' color={product.rate >= 2 && 'orange'}><FaStar /></Text>
                                <Text fontSize='sm' color={product.rate >= 3 && 'orange'}><FaStar /></Text>
                                <Text fontSize='sm' color={product.rate >= 4 && 'orange'}><FaStar /></Text>
                                <Text fontSize='sm' color={product.rate >= 5 && 'orange'}><FaStar /></Text>
                            </HStack>
                        </Flex>
                    </Stack>
                </CardBody>
            </Card>
        </GridItem>
    );
};

export default Product;