import React, { useEffect } from 'react';
import useGetProductById from '../../../hooks/useGetProductById';
import { Img, Text } from '@chakra-ui/react';

const OrderProductById = ({ product, setPrice, size }) => {
    const orderProduct = useGetProductById(product?.productID);

    useEffect(() => {
        setPrice(prev => [...prev, product.quantity * product.price])
    }, [product?.price]);

    return (
        <>
            {
                product?.index < 3 && < Img src={`http://localhost:3500/product/${orderProduct?.filename}`} alt="Ordered product" w={size || '50px'} h={size || '50px'} />
            }
        </>
    )
};

export default OrderProductById;