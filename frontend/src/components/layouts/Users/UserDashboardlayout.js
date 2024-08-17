import CommonLayout from "../common/CommonLayout";
import UserNavs from "./userDashboard/navigation/Navigation";
import { socket } from "../../../socket/socket";
import { useEffect } from "react";
import { setMessages, setNavs } from "../../api/slices/authSliceData";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const UserDashboardlayout = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;
        const length = path.split('/').filter(elem => elem !== "").map((elem, index) => {
            if(index === 0){
                elem = 'Main menu'
            }
            const data = {
                label:  elem[0].toLocaleUpperCase() + elem.slice(1, elem.length),
                link: "#",
                id: index++
            }
            return data;
        });
        dispatch(setNavs(length))
    }, [location]);

    useEffect(() => {

        socket.on('recieveMessage', (data) => {
            dispatch(setMessages(data))
            console.log(data)
        })

        return () => {
            socket.off('recieveMessage');
        }
    }, [socket]);

    return (
       <CommonLayout navs={<UserNavs/>} />
    );
};

export default UserDashboardlayout;