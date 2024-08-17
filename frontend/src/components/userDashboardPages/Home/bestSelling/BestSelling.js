import { Grid } from '@chakra-ui/react';
import Section from '../common/Section';
import Product from '../../common/Product';
import { useEffect, useState } from 'react';
import { useGetTopProductQuery } from '../../../api/slices/productSlice';
const BestSelling = ({ row, products }) => {
    const { data, isLoading, isSuccess, isError, error } = useGetTopProductQuery();
    const [product, setProduct] = useState([]);

    useEffect(() => {

        if (isSuccess && data?.length && products?.length) {
            data.forEach(id => {
                const getProduct = products.find(list => list.id === id);
                if (getProduct) {
                    setProduct(prev => [...prev, getProduct])
                }
            })
        }

        return () => {
            setProduct([]);
        }
    }, [data?.length, isLoading, isSuccess, isError, error, products])

    return (
        <>
            {product?.length && <Section
                title='Top selling products'
                body={<Grid templateColumns={`repeat(${row}, 1fr)`} gap={4}>
                    {product.map(product => (
                        <Product
                            key={product.id}
                            product={product}
                        />
                    ))}
                </Grid>}
            />}
        </>
    );
};

export default BestSelling;