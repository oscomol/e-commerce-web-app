import { Th, Tr } from "@chakra-ui/react";
import TableCont from "../../common/TableCont";
import PerWishList from "./PerWishList";
import { useSelector } from "react-redux";
import { selectAllWishlist } from "../../api/users/wishListSlice";
import useAuth from "../../../hooks/useAuth";

const WishListContent = ({setCheckedList, wishlist}) => {

    return (
        <TableCont
            head={<Tr>
                <Th>Item/s</Th>
                <Th>Brand</Th>
                <Th>Description</Th>
                <Th>Price</Th>
                <Th>Quantity</Th>
            </Tr>}
            body={wishlist.map(wishlist => (
                <PerWishList key={wishlist.id} wishlist={wishlist} setCheckedList={setCheckedList}/>
            ))}
        />
    );
};

export default WishListContent;