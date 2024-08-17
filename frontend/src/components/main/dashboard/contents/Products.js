import {FaFax} from "react-icons/fa6";

import DashSummary from './common/DashSummary';
import { useSelector } from "react-redux";
import { selectAllproduct } from "../../../api/slices/productSlice";

const Products = () => {
    const products = useSelector(selectAllproduct);

    return (
        <DashSummary
            icon={<FaFax/>}
            color="green.300"
            helperText="Total products available"
            title="Avail products"
            data={products?.length}
        />
    );
};

export default Products;