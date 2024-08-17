import React, { useEffect, useState } from 'react';
import { useGetProductQuery } from '../components/api/slices/productSlice';

const useRefetchData = () => {
    const [product, setProduct] = useState([]);
    const {data, isLoading, isSuccess, isError, error} = useGetProductQuery('product, ', {
        pollingInterval: 2000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });
    
    useEffect(() => {
        if(isSuccess){
            console.log(data)
        }
    }, [data, isLoading, isSuccess, isError, error]);

    return data;
};

export default useRefetchData;