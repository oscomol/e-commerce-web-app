import { Grid } from '@chakra-ui/react';
import Section from '../../common/Section';
import Product from '../../../common/Product';
import { useEffect, useState } from 'react';

const NewArrival = ({ row, products }) => {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        if (products?.length) {
            const prodDis = products.slice(products.length - 10, products.length);
            setProduct(prodDis)
        }

        return () => {
            setProduct([]);
        }
    }, [products]);

    return (
        <>
            {product?.length && <Section
                title='New arrival'
                body={<Grid templateColumns={`repeat(${row}, 1fr)`} gap={4}>
                    {product.map(product => (
                        <Product
                            key={product.id}
                            product={product}
                            showBtn={true}
                        />
                    ))}
                </Grid>}
            />}
        </>
    );
};

export default NewArrival;