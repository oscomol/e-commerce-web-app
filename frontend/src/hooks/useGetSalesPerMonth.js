import { useSelector } from "react-redux";
import { selectAllproduct } from "../components/api/slices/productSlice";
import { getOrder } from "../components/api/slices/authSliceData";
import { useEffect, useState } from "react";

const useGetSalesPerMonth = (year) => {
    const products = useSelector(selectAllproduct);
    const orders = useSelector(getOrder);
    const [monthData, setMonthData] = useState([]);
    const [salesData, setSalesData] = useState([]);
    const [orderData, setOrderData] = useState([]);
    const [capitalPrice, setCapitalPrice] = useState([]);
    const [profit, setProfit] = useState([]);

    useEffect(() => {
        if (orders?.length) {
            const fiterOrderByYear = orders.filter(list => list.recievedDate.includes(year));
            const monthlyList = fiterOrderByYear.map(order => {
                return order.status === 4 && { id: order.id, dateCompleted: order.recievedDate, products: order.products }
            })

            if (products?.length) {
                for (let x = 0; x < monthlyList.length; x++) {
                    const list = monthlyList[x];
                    let month = list?.dateCompleted?.slice(0, 2);

                    if (month?.includes('/')) {
                        month = month.slice(0, 1);
                    }

                    const byMonth = { month, products: list.products };
                    setMonthData(prev => [...prev, byMonth]);
                }
            } else {
                setMonthData([]);
            }
        }

        return () => {
            setMonthData([]);
        }
    }, [orders, products, year]);

    const getPrice = (productList) => {
        let prices = [];
        let capital = [];
        let profit = [];
        for (let x = 0; x < productList.length; x++) {
            const product = productList[x];
            const findProduct = products.find(data => data.id === product.productID);
            if (findProduct) {
                const thePrice = product.quantity * product.price;
                const theCapital = findProduct.origPrice * product.quantity;
                prices.push(thePrice)
                capital.push(theCapital);
                profit.push(thePrice - theCapital)

            }
        }

        let sales = prices.length > 1 ? prices.reduce((p1, p2) => p1 + p2) : prices[0];
        let capitalPrice = capital.length > 1 ? capital.reduce((p1, p2) => p1 + p2) : prices[0];
        let profitPrice = profit.length > 1 ? profit.reduce((p1, p2) => p1 + p2) : prices[0];

        return { sales, capitalPrice, profitPrice };
    }

    useEffect(() => {
        let UM = [];
        const order = [
            { month: '1', order: 0 },
            { month: '2', order: 0 },
            { month: '3', order: 0 },
            { month: '4', order: 0 },
            { month: '5', order: 0 },
            { month: '6', order: 0 },
            { month: '7', order: 0 },
            { month: '8', order: 0 },
            { month: '9', order: 0 },
            { month: '10', order: 0 },
            { month: '11', order: 0 },
            { month: '12', order: 0 }
        ]

        if (monthData?.length) {
            for (let x = 0; x < monthData.length; x++) {
                const data = monthData[x];
                if (data.month) {
                    const orderElem = order[data.month - 1];
                    order[data.month - 1] = { ...orderElem, order: orderElem?.order + 1 }
                }
                const isExist = UM.find(UMdata => UMdata.month == data.month);
                if (isExist) {
                    const filterUM = UM.filter(UMdata => UMdata.month !== isExist.month);
                    UM = [...filterUM, { ...isExist, products: [...isExist.products, ...data.products] }]
                } else {
                    if (data.month) {
                        UM.push(data);
                    }
                }
            }
        }else{
            UM = [];
        }

        if (UM.length) {
            const data = UM.map(umData => {
                const { month, products } = umData;
                const { sales, capitalPrice, profitPrice } = getPrice(products)
                return { sales, capitalPrice, profitPrice };
            })
            const sale = data.map(sales => sales.sales)
            const capital = data.map(capital => capital.capitalPrice)
            const profit = data.map(capital => capital.profitPrice)
            setSalesData(sale)
            setCapitalPrice(capital);
            setProfit(profit)
            setOrderData(order.map(order => order.order));
        }else{
            setSalesData([])
            setCapitalPrice([]);
            setProfit([])
            setOrderData([])
        }

        return () => {
            UM = [];
        }
    }, [monthData])

    return { salesData, orderData, capitalPrice, profit };
};

export default useGetSalesPerMonth;