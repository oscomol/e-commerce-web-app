import {
    Tfoot,
    Tr,
    Th,
    Td,
    Box,
    Center,
    Text
} from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import TableCont from '../../../common/TableCont';
import { useSelector } from 'react-redux';
import { getOrder } from '../../../api/slices/authSliceData';
import { selectAllproduct } from '../../../api/slices/productSlice';

const InventoryContent = ({ selected, from, to, sort }) => {
    const [inventoryData, setData] = useState([]);
    const [productsComp, setComp] = useState([]);
    const orders = useSelector(getOrder);
    const products = useSelector(selectAllproduct);
    const [total, setTotal] = useState({ sale: '', income: '' })

    useEffect(() => {
        if (orders?.length) {
            const completed = orders.map(data => {
                if (data.status !== 4) return;
                const newDate = data.recievedDate.slice(0, data.recievedDate.indexOf(","));
                const splitDate = newDate.split("/");
                const newDateStr = splitDate[2] + "-" + splitDate[0] + "-" + splitDate[1];
                const newDateObj = new Date(newDateStr);
                return { ...data, recievedDate: newDateObj };
            }).filter(data => data !== undefined);

            let byDataComp = [];

            if (from && to) {
                let fromCompare;
                let toCompare;
                const fromDate = new Date(from);
                const toDate = new Date(to);

                if (fromDate > toDate) {
                    fromCompare = toDate;
                    toCompare = fromDate;
                } else {
                    fromCompare = fromDate;
                    toCompare = toDate;
                }

                const byDate = completed.filter(data => {
                    const receivedDate = data.recievedDate;
                    return receivedDate >= fromCompare && receivedDate <= toCompare;
                });
                byDataComp = byDate;
            } else {
                byDataComp = completed;
            }

            const productsOnly = byDataComp.flatMap(data => data.products);
            setComp(productsOnly);
        } else {
            setComp([]);
        }

        return () => {
            setComp([]);
        }
    }, [orders, from, to]);



    const getProductData = (id) => {
        const getProduct = products.find(list => list.id === id);
        if (!getProduct) return;
        const { brand, category, origPrice, storePrice, discountedPrice } = getProduct;
        return ({ brand, category, origPrice, storePrice, discountedPrice })
    }

    const sortData = (productOrders) => {
        if (sort === "Sold") {
            return productOrders.sort((s1, s2) => s2.quantity - s1.quantity);
        } else if (sort === "Sales") {
            return productOrders.sort((s1, s2) => (s2.quantity * s2.storePrice) - (s1.quantity * s1.storePrice));
        } else if(sort === "Income"){
            return productOrders.sort((s1, s2) => (s2.quantity * (s2.storePrice - s2.origPrice)) - (s1.quantity * (s1.storePrice - s1.origPrice)));
        }else {
            return productOrders;
        }
    }

    useEffect(() => {
        let productOrders = [];
        if (productsComp) {
            const mappedOrder = productsComp.map(data => {
                return { ...getProductData(data.productID), quantity: data.quantity, productID: data.productID }
            })
            if (mappedOrder?.length) {
                mappedOrder.forEach(data => {
                    const isExist = productOrders.find(list => list.productID === data.productID);
                    if (isExist) {
                        const filteredOrder = productOrders.filter(list => list.productID !== isExist.productID);
                        productOrders = [...filteredOrder, { ...isExist, quantity: data.quantity + isExist.quantity }]
                    } else {
                        productOrders.push(data);
                    }
                })
            }
        }

        if (selected !== "Category(All)") {
            productOrders = productOrders.filter(list => list.category === selected);
        }

        const forTotal = productOrders.map(data => {
            return { total: data.quantity * data.storePrice, income: (data.storePrice - data.origPrice) * data.quantity };
        })
        if (forTotal?.length) {
            const sale = forTotal.map(data => data.total).reduce((s1, s2) => s1 + s2);
            const income = forTotal.map(data => data.income).reduce((i1, i2) => i1 + i2);
            setTotal({ sale, income })
        }

        setData(sortData(productOrders));

        return () => {
            setData([]);
            productOrders = [];
            setTotal({ sale: '', income: '' })
        }
    }, [productsComp, selected, sort])

    let content;

    if (inventoryData?.length) {
        content = <Box p='15px' borderRadius='md' bg='lightgray'>
            <TableCont
                head={<Tr>
                    <Th>Product</Th>
                    <Th>Original price</Th>
                    <Th>Retailed price</Th>
                    <Th>Sold</Th>
                    <Th>Sales</Th>
                    <Th>Income</Th>
                </Tr>}
                body={<>
                    {
                        inventoryData.map(inventory => (
                            <Tr key={inventory.id}>
                                <Td>{inventory.brand}</Td>
                                <Td>{inventory.origPrice}</Td>
                                <Td>{inventory.storePrice}</Td>
                                <Td>{inventory.quantity}</Td>
                                <Td>{inventory.storePrice * inventory.quantity}</Td>
                                <Td>{(inventory.storePrice - inventory.origPrice) * inventory.quantity}</Td>
                            </Tr>
                        ))
                    }</>}
                footer={<Tfoot>
                    <Tr>
                        <Th></Th>
                        <Th></Th>
                        <Th></Th>
                        <Th></Th>
                        <Th>{total.sale}</Th>
                        <Th>{total.income}</Th>
                    </Tr>
                </Tfoot>}
                size='sm'
            />
        </Box>
    } else {
        content = <Center><Text>No Inventory Data to Show!</Text></Center>
    }

    return content;
};

export default InventoryContent;