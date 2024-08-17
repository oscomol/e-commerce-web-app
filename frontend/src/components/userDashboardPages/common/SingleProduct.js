import { Button, HStack, Text, Image, Badge } from "@chakra-ui/react";
import { useDeleteWishlistMutation, useCreateWishlistMutation, selectAllWishlist } from "../../api/users/wishListSlice";
import ModalCont from "../../common/ModalContent";
import { useSelector } from "react-redux";
import useAuth from "../../../hooks/useAuth";
import { FaStar } from "react-icons/fa";

const SingleProduct = ({btnBTN, product}) => {
    const { id } = useAuth();
    const [deleteWishlist] = useDeleteWishlistMutation();
    const [createWishlist] = useCreateWishlistMutation();
    const wishlists = useSelector((state) => selectAllWishlist(state, id));

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
        <ModalCont
            btn={(onOpen) => (
                btnBTN(onOpen)
            )}
            body={(onClose) => (
                <>
                    <Image
                        src={`http://localhost:3500/product/${product.filename}`}
                        alt='Green double couch with wooden legs'
                        borderRadius='lg'
                        width="100%"
                        height="180px"
                        filter={product.stock < 1 && 'auto'}
                        blur={product.stock < 1 && '2px'}
                        minH='200px'
                    />
                    <Text as='p' mt='5px'>{product.description}</Text>
                    <HStack gap={5}>
                        <Text textDecor={product.discountedPrice ? 'line-through' : 'none'} fontWeight='bold'>{product.storePrice}</Text>
                        {product.discountedPrice && <Badge colorScheme="red" mt='3px'>{product.discountedPrice}</Badge>}
                    </HStack>
                    <Text fontSize='13px' color='gray'>Stack: {product.stock}</Text>
                    <HStack gap='1'>
                        <Text fontSize='sm' color={product.rate >= 1 && 'orange'}><FaStar /></Text>
                        <Text fontSize='sm' color={product.rate >= 2 && 'orange'}><FaStar /></Text>
                        <Text fontSize='sm' color={product.rate >= 3 && 'orange'}><FaStar /></Text>
                        <Text fontSize='sm' color={product.rate >= 4 && 'orange'}><FaStar /></Text>
                        <Text fontSize='sm' color={product.rate >= 5 && 'orange'}><FaStar /></Text>
                    </HStack>
                </>
            )}
            footer={(onClose) => (
                <>
                    <Button size="sm" colorScheme="green" variant="ghost" isDisabled={checkWishlist(product.id)?.id} onClick={handleWishList}>Add to cart</Button>
                    <Button size="sm" colorScheme="red" variant="ghost" float='right' ml='10px' onClick={onClose}>Exit</Button>
                </>
            )}
            size="md"
            title={product.brand}
            footerP="10px"
        />
    );
};

export default SingleProduct;