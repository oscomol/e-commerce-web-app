import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getOrder } from '../components/api/slices/authSliceData';
import { selectAllproduct } from '../components/api/slices/productSlice';

const useGetTotalSale = (when) => {
    const [totalSale, setTotalSale] = useState('');
    const products = useSelector(selectAllproduct);
    const orders = useSelector(getOrder)

    let total = 0;

    const addFee = (fee) => {
        total += fee;
        setTotalSale(total);
    }

    useEffect(() => {
        if (orders.length) {
            const completed = orders.filter(order => order.status === 4);
            let toGet = [];
            if (when === 'total') {
                toGet = completed;
            } else {
                toGet = completed.filter(order => order.recievedDate.includes(when))
            }
            for (let i = 0; i < toGet.length; i++) {
                addFee(toGet[i].shippingFee);
                const product = toGet[i].products;
                for (let p = 0; p < product.length; p++) {
                    const orderP = product[p];
                    addFee(orderP.price * orderP.quantity)
                }
            }
        }
    }, [when, orders, products]);

    return totalSale;
};

export default useGetTotalSale;