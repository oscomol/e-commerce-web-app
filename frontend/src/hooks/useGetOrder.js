import { useEffect } from "react";
import { useGetAllOrderByIdQuery, useGetOrderQuery } from "../components/api/users/orderSlice";
import useAuth from "./useAuth";

const useGetOrder = () => {
    const {id} = useAuth();
    // const {data, isLoading, isSuccess, isError, error} = useGetAllOrderByIdQuery(id, 
    // {
    //     pollingInterval: 5000,
    //     refetchOnFocus: true,
    //     refetchOnMountOrArgChange: true
    // });

    // if(isLoading){
    //     console.log("Loading");
    // }else{
    //     if(isError){
    //         console.log(error)
    //     }else{
    //         console.log(data);
    //     }
    // }
};

export default useGetOrder;