import Product from '../common/Product';

import Main from '../../main/Main';
import { useEffect, useState } from 'react';
import { Flex, Grid } from '@chakra-ui/react';
import useResponsive from '../../../hooks/useResponsive';
import Category from './category/Category';
import { useSelector } from 'react-redux';
import NoProduct from './NoProduct';
import { getProducts } from '../../api/slices/authSliceData';

const Store = () => {
    const { isMax720, isMax900, isMax950, isMax1100, isMax1350 } = useResponsive();
    const [row, setRow] = useState(5);
    const [selected, setSelected] = useState('Category');
    const [productDisplay, setProductDisplay] = useState([]);
    const products = useSelector(getProducts);

    useEffect(() => {
        if (isMax720) {
            setRow(2);
        } else {
            if (isMax900) {
                setRow(3);
            } else {
                if (isMax950) {
                    setRow(4);
                } else {
                    if (isMax1100) {
                        setRow(3);
                    } else {
                        if (isMax1350) {
                            setRow(4);
                        } else {
                            setRow(5);

                        }
                    }
                }
            }
        }
    }, [isMax720, isMax900, isMax950, isMax1100, isMax1350]);

    useEffect(() => {
        if (selected === "Category") {
            setProductDisplay(products)
        } else {
            setProductDisplay(products.filter(list => list.category === selected))
        }

        return () => {
            setProductDisplay([]);
        }
    }, [selected, products]);

    let content;

    if (productDisplay?.length) {
        content = <Grid p='30px' templateColumns={`repeat(${row}, 1fr)`} gap={4}>
            {productDisplay.map(product => (
                <Product key={product.id} product={product} />
            ))}
        </Grid>
    }else{
        content = <NoProduct />
    }

    return (
        <>
            <Main
                otherBtn={<Flex w='40%' justify='flex-end'>
                    <Category {...{ selected, setSelected }} />
                </Flex>}
            />
            {content}
        </>
    );
};

export default Store;