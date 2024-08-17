import { Grid, Text } from '@chakra-ui/react';

import Section from '../../common/Section';
import Product from '../../../common/Product';
import { useSelector } from 'react-redux';
import { getOrder, getProducts } from '../../../../api/slices/authSliceData';
import { selectAllWishlist } from '../../../../api/users/wishListSlice';
import { useEffect, useState } from 'react';
import useAuth from '../../../../../hooks/useAuth';
import { selectAllproduct } from '../../../../api/slices/productSlice';
import RecommendItem from './RecommendItem';

const Recommended = ({ row, products }) => {
    const { id } = useAuth();
    const orders = useSelector(getOrder)
    const wishlist = useSelector(state => selectAllWishlist(state, id));
    const [interest, setInterest] = useState([]);
    const [topCategpory, setTopCategory] = useState([]);

    const getCategory = (id) => {
        const getCateg = products.find(list => list.id === id);
        if (!getCateg) return;
        return getCateg.category;
    }

    useEffect(() => {
        if (wishlist?.length) {
            wishlist.forEach(data => {
                const categRes = getCategory(data.productID);
                if (categRes) {
                    setInterest(prev => [...prev, { category: categRes, score: 1 }]);
                }
            })
        }
    }, [wishlist, products]);


    useEffect(() => {
        if (orders?.length) {
            orders.forEach(data => {
                const products = data.products;
                products.forEach(data => {
                    const categRes = getCategory(data.productID);
                    if (categRes) {
                        setInterest(prev => [...prev, { category: categRes, score: 2 }]);
                    }
                })
            })
        }
    }, [orders, products]);

    useEffect(() => {
        let categoryData = [];

        if (interest?.length) {
            interest.forEach(list => {
                const isExist = categoryData.find(data => data.category === list.category);
                if (isExist) {
                    const filteredInt = categoryData.filter(data => data.category !== isExist.category);
                    categoryData = [...filteredInt, { ...isExist, score: isExist.score + list.score }];
                } else {
                    categoryData.push(list);
                }
            })
        }

        if (categoryData?.length) {
            const sortedCateg = categoryData.sort((c1, c2) => c2.score - c1.score);
            let toInsert = [];
            if (sortedCateg > 5) {
                toInsert = sortedCateg.slice(0, 5)
            } else {
                toInsert = sortedCateg;
            }
            const categoryOnly = toInsert.map(data => data.category).sort(() => Math.random() - 0.5);
            setTopCategory(categoryOnly)
        }

        return () => {
            categoryData = [];
            setTopCategory([]);
        }
    }, [interest?.length])

    return (
        <>
            {topCategpory?.length && <Section
            title='Recommended for you'
            body={<Grid templateColumns={`repeat(${row}, 1fr)`} gap={4}>
                {topCategpory.map(category => (
                    <RecommendItem key={category} category={category} />
                ))}
            </Grid>}
        />}
        </>
    );
};

export default Recommended;