import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getOrder, getToken } from "../components/api/slices/authSliceData";

const useFilterOrder = (stat, isComplete) => {
    const [orderData, setOrderData] = useState([]);
    const orders = useSelector(getOrder);
    const token = useSelector(getToken)

    useEffect(() => {
       if(isComplete){
        const orderByStat = orders.filter(order => order.status >= 4);
        setOrderData(orderByStat)
       }else{
        const orderByStat = orders.filter(order => order.status === stat);
        setOrderData(orderByStat)
       }
        
    }, [stat, orders, token]);

    return orderData;
};

export default useFilterOrder;