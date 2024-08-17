import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAllOrder } from "../components/api/users/orderSlice";
import useAuth from "./useAuth";

const useOrderByStat = (stat) => {
    const {id} = useAuth();
    const [data, setData] = useState([]);
    // const orders = useSelector(selectAllOrder);

    // useEffect(() => {
    //     if(orders?.length){
    //         const order = orders.filter(order => order.status === stat);
    //         setData(order);
    //     }
    // }, [orders]);

    return data;
};

export default useOrderByStat;