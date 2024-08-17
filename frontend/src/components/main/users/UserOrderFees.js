import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllproduct } from '../../api/slices/productSlice';
import { Td } from '@chakra-ui/react';

const UserOrderFees = ({product, sf}) => {
    const products = useSelector(selectAllproduct);
    const [totalPrice, setTotalPrice] = useState('');

    useEffect(() => {
        if(products?.length){
            const mappedOrder = product.map(data => {
                const getProduct = products.find(list => list.id === data.productID);
                if(!getProduct) return;
                return getProduct.storePrice * data.quantity;
            })
            setTotalPrice(mappedOrder?.length > 1 ? mappedOrder[0]:mappedOrder.reduce((t1, t2) => t1 + t2))
        }

        return () => {
            setTotalPrice('');
        }
    }, [products])

    return <Td>{totalPrice + sf}</Td>
};

export default UserOrderFees;