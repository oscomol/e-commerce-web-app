import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getOrder } from '../components/api/slices/authSliceData';
import { selectAllproduct } from '../components/api/slices/productSlice';

const useGetTopSellingProduct = (year) => {
    const order = useSelector(getOrder);
    const productList = useSelector(selectAllproduct);
    const [products, setProducts] = useState([]);
    const [topSelling, setTopSelling] = useState([]);

    useEffect(() => {
        if (order?.length) {
            order.forEach(data => {
                if (data.recievedDate.includes(year)) {
                    setProducts(prev => [...prev, ...data.products])
                }
            })
        }

        return () => {
            setProducts([]);
        }
    }, [order, year])

    const getProduct = (data) => {
        console.log(data)
        const findProduct = productList.find(list => list.id === data.productID);
        if (!findProduct) return;
        return { ...data, price: findProduct.storePrice, item: findProduct.brand, capital: findProduct.origPrice };
    }

    useEffect(() => {
        let productArr = [];

        if (products?.length) {
            products.forEach(data => {
                const isExist = productArr.find(list => list.productID === data.productID);
                if (isExist) {
                    const filteredArr = productArr.filter(list => list.productID !== isExist.productID);
                    productArr = [...filteredArr, { productID: isExist.productID, quantity: isExist.quantity + data.quantity }]
                } else {
                    productArr.push({ quantity: data.quantity, productID: data.productID })
                }
            })
        }

        let sortedItem = productArr.sort((l1, l2) => l2.quantity - l1.quantity)
        if (sortedItem?.length) {
            if (sortedItem.length > 15) {
                sortedItem.slice(0, 15);
            }

            const sellingData = sortedItem.map(data => {
                const res = getProduct(data);
                return res;
            })
            setTopSelling(sellingData)
        }

        return () => {
            setTopSelling([]);
        }
    }, [products])

    return topSelling;
};

export default useGetTopSellingProduct;