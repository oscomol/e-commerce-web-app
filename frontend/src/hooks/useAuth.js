import { useSelector } from "react-redux";
import { getToken } from "../components/api/slices/authSliceData";
import {jwtDecode} from "jwt-decode";

const useAuth = () => {
    const token = useSelector(getToken);
    let isAdmin = false;
    let status = 'user';

    if(token){
        const user = jwtDecode(token);
        const {username, role, id} = user.userinfo;

        isAdmin = role === 1;

        if(isAdmin) status = "admin";

        return {username, role, isAdmin, status, id};
    }
    return {username: '', role: [], isAdmin, status};
};

export default useAuth;