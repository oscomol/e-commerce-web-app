import { Flex, HStack, Spacer, Text,  Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink } from '@chakra-ui/react';
import { FaChevronRight } from 'react-icons/fa';

import { mainHeaderCont } from './main.styles';
import useGetScroll from '../../hooks/useGetScroll';
import useResponsive from '../../hooks/useResponsive';
import { useSelector } from 'react-redux';
import { getNavs } from '../api/slices/authSliceData';

const Main = ({ otherBtn }) => {
    const datas = useSelector(getNavs)
    const {isMax950} = useResponsive();
    const scroll = useGetScroll();
    const isLinkFixed = scroll > 57;

    return (
        <Flex sx={mainHeaderCont} borderBottom='1px solid lightgray' position={(isLinkFixed && !isMax950) ? 'fixed':'none'} zIndex={isLinkFixed ? 999 : 'unset'} top='0' bg='white' align='center'>
            <Breadcrumb spacing='8px' separator={<FaChevronRight/>}>
                {datas.map((data, index) => (
                    <BreadcrumbItem key={index} color={data.id === datas.length ? "black":"gray"}>
                        <BreadcrumbLink href={data.link}>{data.label}</BreadcrumbLink>
                    </BreadcrumbItem>
                ))}
            </Breadcrumb>
            <Spacer />
            {otherBtn && otherBtn}
        </Flex>
    );
};

export default Main;