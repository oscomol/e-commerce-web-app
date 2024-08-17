import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { Store } from "./Store";
import { productSlice } from "./slices/productSlice";
import { userSlice } from "./slices/userSlice";
import { wishlistSlice } from "./users/wishListSlice";
import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import useSocketEvents from "../../hooks/useSocketEvents";

const Prefetch = () => {
    const { id } = useAuth();
    useSocketEvents();

    useEffect(() => {
        const product = Store.dispatch(productSlice.endpoints.getProduct.initiate());
        const user = Store.dispatch(userSlice.endpoints.getUser.initiate());

        return () => {
            product.unsubscribe();
            user.unsubscribe();
        }
    }, []);

    useEffect(() => {
        const wishlist = Store.dispatch(wishlistSlice.endpoints.getWishlist.initiate(id));

        return () => {
            wishlist.unsubscribe();
        }
    }, [id]);


    return <Outlet />
};

export default Prefetch;