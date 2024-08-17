import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAllproduct } from "../components/api/slices/productSlice";


const useGetProductById = (productID) => {
    const [data, setData] = useState({});
    const products = useSelector(selectAllproduct);

    useEffect(() => {
        if(products?.length) {
            const product = products.find(product => product.id === productID);
            if(product){
                setData(product);
            }
        }
    }, [products]);

    return data;
};

export default useGetProductById;