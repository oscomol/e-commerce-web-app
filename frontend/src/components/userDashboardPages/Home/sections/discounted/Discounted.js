import { Grid } from '@chakra-ui/react';

import Section from '../../common/Section';
import Product from '../../../common/Product';
import { useEffect, useState } from 'react';

const Discounted = ({ row, products }) => {
    const [withDis, setWithDis] = useState([]);

    useEffect(() => {
        if (products?.length) {
            const discounted = products.filter(list => list.discountedPrice > 0);
            if (discounted?.length) {
                if (discounted.length > 5) {
                    const sortedDisc = discounted.sort(() => Math.random() - 0.5);
                    setWithDis(sortedDisc.slice(0, 5))
                } else {
                    setWithDis(discounted);
                }
            }
        }
    }, [products]);

    return (
        <>
            {withDis?.length && <Section
                title='Discounted products up to 15% off'
                body={<Grid templateColumns={`repeat(${row}, 1fr)`} gap={4}>
                    {withDis.map(product => (
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

export default Discounted;