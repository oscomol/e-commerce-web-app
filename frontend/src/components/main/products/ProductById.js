import { GridItem, Image, Text, Flex, Spacer, Card, CardBody, Stack, Heading, HStack, Img, Button, useToast } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import ModalCont from "../../common/ModalContent";
import FileSelectore from "./FileSelectore";
import CategorySelector from "./CategorySelector";
import CustomInp from "../../common/CustomInp";

import { useUpdateProductInfoMutation, useDeleteProductMutation, useUpdateProductPhotoMutation } from "../../api/slices/productSlice";

import { useEffect, useState } from "react";

const ProductById = ({ product }) => {
    const [brand, setBrand] = useState('');
    const [originalPrice, setOriginalPrice] = useState('');
    const [storePrice, setStorePrice] = useState('');
    const [discountedPrice, setDiscountedPrice] = useState('');
    const [stock, setStock] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState({ file: '', preview: '' });

    const [isLoading, setIsLoading] = useState(false);

    const toast = useToast();

    const [updateProductInfo] = useUpdateProductInfoMutation();
    const [updateProductPhoto] = useUpdateProductPhotoMutation();
    const [deleteProduct] = useDeleteProductMutation();

    useEffect(() => {
        if (product) {
            setBrand(product.brand);
            setOriginalPrice(product.origPrice);
            setStorePrice(product.storePrice);
            setDiscountedPrice(product.discountedPrice > 0 ? product.discountedPrice : "");
            setStock(product.stock);
            setDescription(product.description);
            setCategory(product.category);
        }
    }, [product]);

    const checkDoneBtn = [brand, originalPrice, storePrice, stock, description, category].every(Boolean);

    const checkClearBtn = [brand, discountedPrice, originalPrice, storePrice, stock, description, category, image.file].some(Boolean);

    const handleClear = () => {
        setBrand('');
        setOriginalPrice('');
        setStorePrice('');
        setDiscountedPrice('');
        setDescription('');
        setCategory('');
        setStock('');
        setImage({ file: '', preview: '' });
    }

    const handleSubmit = async (onClose) => {
        try {
            setIsLoading(true);
            if (image?.file) {
                const formData = new FormData();
                formData.append('file', image?.file);
                formData.append('brand', brand);
                formData.append('origPrice', originalPrice);
                formData.append('storePrice', storePrice);
                formData.append('stock', stock);
                formData.append('description', description);
                formData.append('category', category);
                formData.append('filename', product?.filename);
                formData.append('discountedPrice', discountedPrice ?? 0);
                formData.append('id', product?.id);
                const res = await updateProductPhoto(formData).unwrap();
            } else {
                let initialData = { discountedPrice: discountedPrice ?? 0, brand, origPrice: originalPrice, storePrice, stock, description, category, id: product?.id };
                const res = await updateProductInfo(initialData).unwrap();
            }
        } catch (err) {
            toast({
                title: 'Error',
                description: `Product not updated`,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        } finally {
            onClose();
            handleClear();
            setIsLoading(false);
            toast({
                title: 'Product updated.',
                description: `Product ${brand} updated succesfully`,
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        }
    }

    const handleDelete = async (onClose) => {
        const id = product?.id;
        const filename = product?.filename;
        try {
            setIsLoading(true);
            const res = await deleteProduct({ id, filename }).unwrap();
        } catch (err) {
            console.log(err)
            toast({
                title: 'Error',
                description: `Product not deleted`,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        } finally {
            onClose();
            setIsLoading(false);
        }
    }

    return (
        <ModalCont
            btn={(onOpen) => (
                <GridItem border='1px solid lightgray' borderRadius='lg' key={product.id} onClick={onOpen} filter={product.stock < 1 && 'auto'} brightness={product.stock < 1 && '80%'}>
                    <Card maxW='sm'>
                        <CardBody>
                            <Image
                                src={`http://localhost:3500/product/${product.filename}`}
                                alt='Green double couch with wooden legs'
                                borderRadius='lg'
                                width="100%"
                                height='180px'
                                filter={product.stock < 1 && 'auto'}
                                blur={product.stock < 1 && '2px'}
                            />
                            <Stack mt='4' gap='-2px'>
                                <Heading size='md'>{product.brand}</Heading>
                                <Text>
                                    {product.description.length > 17 ? `${product.description.slice(0, 17)}...` : product.description}
                                </Text>
                                <Text fontSize='md' fontWeight='bold' color='red' textDecor={product.discountedPrice ? 'line-through' : 'none'}>
                                    {product.storePrice}
                                    {product.discountedPrice && <Text as='span' float='right' color='black' textDecor='none'>{product.discountedPrice}</Text>}
                                </Text>
                                <Flex>
                                    <Text fontSize='13px' color="gray">Stock: {product.stock}</Text>
                                    <Spacer />
                                    <HStack gap='-5px'>
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
            )}
            size="xl"
            title={`Updating product ${product.brand}`}
            body={(onClose) => (
                <Flex flexDir='column' gap='20px'>
                    <CustomInp {...{ value: brand, setValue: setBrand, labelTag: 'Brand/name', type: "text" }} />
                    <CustomInp {...{ value: originalPrice, setValue: setOriginalPrice, labelTag: 'Capital(per one)', type: "number" }} />
                    <CustomInp {...{ value: storePrice, setValue: setStorePrice, labelTag: 'Price(per one)', type: "number" }} />
                    <CustomInp {...{ value: discountedPrice, setValue: setDiscountedPrice, labelTag: 'Discounted Price(Optional)', type: "number" }} />
                    <CustomInp {...{ value: stock, setValue: setStock, labelTag: 'Stock', type: "number" }} />
                    <CustomInp {...{ value: description, setValue: setDescription, labelTag: 'Description/instruction', type: "textarea" }} />
                    <CategorySelector {...{ value: category, setValue: setCategory }} />
                    <FileSelectore {...{ setImage, filename: image.file?.name ?? product.filename }} />
                    <Img src={image.preview ? image.preview : `http://localhost:3500/product/${product.filename}`} width='100%' maxH='300px' />
                </Flex>
            )}
            footer={(onClose) => (
                <>
                    <Button onClick={() => handleSubmit(onClose)} float='right' mr='20px' colorScheme="green" size='sm' w='80px' isDisabled={!checkDoneBtn || isLoading}>Update</Button>
                    <Button float='right' colorScheme="red" size='sm' w='80px' isDisabled={!checkClearBtn || isLoading} onClick={() => handleDelete(onClose)}>Delete</Button>
                </>
            )}
        />
    );
};

export default ProductById;