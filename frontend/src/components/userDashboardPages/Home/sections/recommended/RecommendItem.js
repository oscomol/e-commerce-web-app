import { useSelector } from "react-redux";
import { selectAllproduct } from "../../../../api/slices/productSlice";
import { useEffect, useState } from "react";
import Product from "../../../common/Product";
import { getProducts } from "../../../../api/slices/authSliceData";

const RecommendItem = ({ category }) => {
    const products = useSelector(getProducts);
    const [productInterest, setProductInterest] = useState([]);

    useEffect(() => {
        if (products?.length) {
            const findCategPro = products.filter(list => list.category === category);
            if (findCategPro?.length > 6) {
                const shuffledArray = findCategPro.sort(() => Math.random() - 0.5);
                const randomProducts = shuffledArray.slice(0, 6);
                setProductInterest(randomProducts);
            } else {
                setProductInterest(findCategPro);
            }
        }
      
        return () => {
            setProductInterest([]);
        }
    }, [products, category]);

    return (
        <>
            {productInterest?.length && productInterest.map(product => (
                <Product
                    key={product.id}
                    product={product}
                />
            ))}
        </>
    );
};

export default RecommendItem;