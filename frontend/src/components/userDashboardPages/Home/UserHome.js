import { Box, Center, Flex, Spinner } from '@chakra-ui/react';

import Main from '../../main/Main';
import Discounted from './sections/discounted/Discounted';
import Exclusive from './sections/exclusive/Exclusive';
import BestSelling from './bestSelling/BestSelling';
import NewArrival from './sections/newArrivals/NewArrivals';
import Recommended from './sections/recommended/Recommended';
import useGetScroll from '../../../hooks/useGetScroll';
import useResponsive from '../../../hooks/useResponsive';
import { useState, useEffect } from 'react';
import { selectAllproduct, useGetProductQuery } from '../../api/slices/productSlice';
import { useSelector } from 'react-redux';
import { getProducts } from '../../api/slices/authSliceData';

const UserHome = () => {
    const products = useSelector(getProducts);
    const { isMax720, isMax900, isMax950, isMax1100, isMax1350 } = useResponsive();
    const [row, setRow] = useState('5');

    useEffect(() => {
        if (isMax720) {
            setRow(2)
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

    let content;
    if(products?.length){
        content = <Flex flexDirection='column' p='30px' gap='30px'>
        <Discounted   {...{ row, products }} />
        <BestSelling  {...{ row, products }} />
        <NewArrival   {...{ row, products }} />
        <Recommended  {...{ row, products }} />
    </Flex>
    }else{
        content = <Center mt='70px'><Spinner/></Center>
    }

    return content;
};

export default UserHome;