import { Link, Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getToken } from "../../api/slices/authSliceData";
import { useRefreshMutation } from "../../api/slices/authApiSlice";
import { useEffect, useRef, useState } from "react";
import { Spinner, Text, Flex } from "@chakra-ui/react";
import Loading from "../../common/Loading";

const PersistLogin = () => {

    const persist = true;
    const token = useSelector(getToken)
    const effectRan = useRef(false)

    const navigate = useNavigate();

    const [trueSuccess, setTrueSuccess] = useState(false)

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation()


    useEffect(() => {
        console.log("TOKEN: ", token)
        console.log("PERSIST: ", persist)
       
            const verifyRefreshToken = async () => {
                console.log('verifying refresh token')
                try {
                    const res = await refresh();
                    setTrueSuccess(true)
                }
                catch (err) {
                    console.error(err)
                }
            }
            if (!token && persist) verifyRefreshToken()
        // }

        // return () => effectRan.current = true

        // eslint-disable-next-line
    }, [])


    let content
    if(!persist){
        content = <Outlet/>
    } else
    if (isLoading) { //persist: yes, token: no
        console.log('loading')
        content = <Loading />
    } else if (isError) { //persist: yes, token: no
        navigate("/");
        content = <Text>ERROR OCCUR</Text>
        
    } else if (isSuccess && trueSuccess) { //persist: yes, token: yes
        console.log('success')
        content = <Outlet />
    } else if (token && isUninitialized) { //persist: yes, token: yes
        console.log('token and uninit')
        console.log(isUninitialized)
        content = <Outlet />
    }
    return content
}
export default PersistLogin;