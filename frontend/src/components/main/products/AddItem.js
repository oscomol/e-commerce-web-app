import { useState } from "react";
import CustomInp from "../../common/CustomInp";
import CategorySelector from "./CategorySelector";
import FileSelectore from "./FileSelectore";

import { Text, Img, Button, Flex, Spinner } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import ModalCont from "../../common/ModalContent";
import { useCreateProductMutation } from "../../api/slices/productSlice";
import { socket } from "../../../socket/socket";

const AddItem = () => {
    const [brand, setBrand] = useState('');
    const [originalPrice, setOriginalPrice] = useState('');
    const [storePrice, setStorePrice] = useState('');
    const [discountedPrice, setDiscountedPrice] = useState('');
    const [stock, setStock] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState({ file: '', preview: '' });

    const [createProduct, { isLoading, isSuccess, isError, error }] = useCreateProductMutation();

    const checkDoneBtn = [brand, originalPrice, storePrice, stock, description, category, image.file].every(Boolean);

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
            const formData = new FormData();
            formData.append('file', image?.file);
            formData.append('brand', brand);
            formData.append('originalPrice', originalPrice);
            formData.append('storePrice', storePrice);
            formData.append('stock', stock);
            formData.append('description', description);
            formData.append('category', category);
            if (discountedPrice) { formData.append('discountedPrice', discountedPrice) }
            const res = await createProduct(formData).unwrap()
            if (res) {
                socket.emit('newProductNotif', {trackingID: res.id})
                handleClear();
            }
        } catch (err) {
            console.log(err);
        } finally {
            onClose();
        }
    }

    return (
        <ModalCont
            btn={(onOpen) => (
                <Button rightIcon={<FaPlus/>} onClick={onOpen} colorScheme="green" size='sm'>New</Button>
            )}
            title='Add a new product'
            size='xl'
            footerP={true}
            body={(onClose) => (
                <Flex flexDir='column' gap='20px'>
                    <CustomInp {...{ value: brand, setValue: setBrand, labelTag: 'Brand/name', type: "text" }} />
                    <CustomInp {...{ value: originalPrice, setValue: setOriginalPrice, labelTag: 'Capital(Per one)', type: "number" }} />
                    <CustomInp {...{ value: storePrice, setValue: setStorePrice, labelTag: 'Price(Per one)', type: "number" }} />
                    <CustomInp {...{ value: discountedPrice, setValue: setDiscountedPrice, labelTag: 'Discounted Price(Optional)', type: "number" }} />
                    <CustomInp {...{ value: stock, setValue: setStock, labelTag: 'Stock', type: "number" }} />
                    <CustomInp {...{ value: description, setValue: setDescription, labelTag: 'Description/instruction', type: "textarea" }} />
                    <CategorySelector {...{ value: category, setValue: setCategory }} />
                    <FileSelectore {...{ setImage, filename: image.file?.name }} />
                    {image?.preview && <Img src={image.preview} width='100%' maxH='300px' />}
                </Flex>
            )}
            footer={(onClose) => (
                <>
                    <Button onClick={() => handleSubmit(onClose)} float='right' mr='20px' colorScheme="green" size='sm' w='80px'  isDisabled={!checkDoneBtn || isLoading}>{isLoading ? <Spinner /> : 'Done'}</Button>
                    <Button onClick={handleClear} float='right' colorScheme="red" size='sm' w='80px' isDisabled={!checkClearBtn || isLoading}>Clear</Button>
                </>
            )}
        />
    );
};

export default AddItem;