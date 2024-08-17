import { Flex, Badge, Center, Text, Image, HStack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { getOrder, getProducts } from '../../../../api/slices/authSliceData';
import { useEffect, useState } from 'react';
import { selectAllUser } from '../../../../api/slices/userSlice';
import { useGetRateMutation } from '../../../../api/users/rateSlice';
import { FaStar } from 'react-icons/fa';

const Rating = ({ notification, seenNotif }) => {
    const orders = useSelector(getOrder)
    const users = useSelector(selectAllUser);
    const products = useSelector(getProducts)
    const [ratedDetails, setRateDetails] = useState({});
    const [rate, setRate] = useState('');

    const [orderRate, {isLoading}] = useGetRateMutation();

    const getUserData = (id) => {
        const user = users.find(list => list.id === id);
        if (user) {
            return user.username
        }
    }

    const getOrderRate = async () => {
        try{
            const res = await orderRate({trackingID: notification.notifID, id: notification.id}).unwrap();
            if(res) {
                setRate(res.msg)
            }
        }catch(err){
            console.log(err)
        }finally{
            seenNotif(notification.id)
        }
    }

    useEffect(() => {
     getOrderRate()
    }, [notification.notifID])

    const getProductData = (allProduct) => {
        const productDetails = allProduct.map(data => {
            const product = products.find(prodData => prodData.id == data.productID);
            if (product) {
                return { filename: product.filename, brand: product.brand, description: product.description };
            }
        })
        return productDetails
    }

    useEffect(() => {
        if (orders?.length && notification.notifID) {
            const order = orders.find(list => list.trackingID === notification.notifID);
            if (order) {
                const product = getProductData(order.products)
                const user = getUserData(order.userID)
                const ratesDetails = { product, user };
                setRateDetails(ratesDetails)
            }
        }

        return () => {
            setRateDetails({})
        }
    }, [notification.notifID, orders.length]);

    let content;

    if(isLoading){
        content = <Text>Loading please wait!</Text>
    }else{
        if (ratedDetails) {
            content = <>
                <Center mb='25px'><Badge colorScheme='orange'>{`${ratedDetails.user} rated an order with the products `}</Badge></Center>
                {
                    ratedDetails?.product?.map(data => (
                        <Flex key={data.id} flexDir='column' align='center'>
                            <Image
                                src={`http://localhost:3500/product/${data.filename}`}
                                width="80px"
                                height="80px"
                                borderRadius='md'
                            />
                            <Badge>{data.brand}</Badge>
                            <Text as='p'>{data.description}</Text>
                        </Flex>
                    ))
                }
                <Center mt='50px'>
                    <HStack gap='2'>
                        <Text color={rate >= 1 && 'orange'}><FaStar/></Text>
                        <Text color={rate >= 2 && 'orange'}><FaStar/></Text>
                        <Text color={rate >= 3 && 'orange'}><FaStar/></Text>
                        <Text color={rate >= 4 && 'orange'}><FaStar/></Text>
                        <Text color={rate >= 5 && 'orange'}><FaStar/></Text>
                    </HStack>
                </Center>
            </>
        } else {
            content = null;
        }
    }

    return content;
};

export default Rating;