import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllproduct } from '../components/api/slices/productSlice';
import { getOrder } from '../components/api/slices/authSliceData';

const useGetSaleByCategory = (year) => {
    const products = useSelector(selectAllproduct);
    const orders = useSelector(getOrder);
    const [productSold, setProductSold] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (orders.length) {
            const completed = orders.filter(order => order.status === 4 && order.recievedDate.includes(year));
            if (completed.length) {
                for (let x = 0; x < completed.length; x++) {
                    const order = completed[x];
                    setProductSold(prev => [...prev, ...order.products])
                }
            }
        }

        return () => {
            setProductSold([]);
        };
    }, [orders, year]);

    const getCategory = (data) => {
        let productData = {};
        const getProduct = products.find(product => product.id === data.productID);
        if (getProduct) {
            productData = { category: getProduct.category, price: data.price * data.quantity, capital:  getProduct.origPrice * data.quantity, profit: (data.price * data.quantity) -  (getProduct.origPrice * data.quantity)};
        }
        return productData;
    }

    useEffect(() => {
        let CONST_CATIG = [
            { category: "Electronics", sale: 0, profit: 0, capital: 0 },
            { category: "Clothing", sale: 0, profit: 0, capital: 0 },
            { category: "Home", sale: 0, profit: 0, capital: 0 },
            { category: "Health", sale: 0, profit: 0, capital: 0 },
            { category: "Sports", sale: 0, profit: 0, capital: 0 },
            { category: "Books", sale: 0, profit: 0, capital: 0 },
            { category: "Pet", sale: 0, profit: 0, capital: 0 },
            { category: "Beauty", sale: 0, profit: 0, capital: 0 },
            { category: "Food", sale: 0, profit: 0, capital: 0 },
            { category: "Outdoor", sale: 0, profit: 0, capital: 0 },
            { category: "Art", sale: 0, profit: 0, capital: 0 },
            { category: "Travel", sale: 0, profit: 0, capital: 0 },
            // { category: "Games", sale: 0, profit: 0, capital: 0 },
            // { category: "Accessories", sale: 0, profit: 0, capital: 0 },
            // { category: "Tech", sale: 0, profit: 0, capital: 0 },
            // { category: "Decor", sale: 0, profit: 0, capital: 0 },
            // { category: "Fitness", sale: 0, profit: 0, capital: 0 },
            // { category: "Stationery", sale: 0, profit: 0, capital: 0 },
            // { category: "Snacks", sale: 0, profit: 0, capital: 0 },
            // { category: "Sustainability", sale: 0, profit: 0, capital: 0 },
            // { category: "Crafts", sale: 0, profit: 0, capital: 0 },
            // { category: "DIY", sale: 0, profit: 0, capital: 0 },
            // { category: "Subscriptions", sale: 0, profit: 0, capital: 0 }
        ]
        if (productSold?.length) {
            const sales = productSold.map(data => {
                return getCategory(data);
            })

            if (sales?.length) {
                for (let x = 0; x < sales.length; x++) {
                    const salesData = sales[x];
                    const index = CONST_CATIG.find(category => category.category === salesData.category);
                    if (index) {
                        const filteredData = CONST_CATIG.filter(data => data.category !== index.category);
                        CONST_CATIG = [...filteredData, { ...index, sale: salesData.price + index.sale, capital: salesData.capital + index.capital, profit: salesData.profit + index.profit}]
                    } else {
                        CONST_CATIG.push(salesData)
                    }
                }
            }
        }
        setCategories(CONST_CATIG)
    }, [productSold]);

    return { categories }
};

export default useGetSaleByCategory;