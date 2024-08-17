import { Grid, useMediaQuery, Flex, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import ProductById from "./ProductById";
import { useState, useEffect } from "react";
import { getProducts } from "../../api/slices/authSliceData";

const ProductContent = ({isSelected}) => {
     const [isMax670, isMax900, isMax1200] = useMediaQuery(['(max-width: 670px)', '(max-width: 900px)', , '(max-width: 1200px)']);
     const allProduct = useSelector(getProducts);
     const [filteredData, setData] = useState([]);

     useEffect(() => {
          if(isSelected == "Category"){
               setData(allProduct);
          }else{
               const filterProduct = allProduct.filter(list => list.category === isSelected);
               setData(filterProduct);
          }

          return () => {
               setData([]);
          }
     }, [isSelected, allProduct]);

     let content;
     if (filteredData?.length) {
          content = <Grid templateColumns={isMax670 ? 'repeat(2, 1fr)' : isMax900 ? 'repeat(3, 1fr)' : isMax1200 ? 'repeat(3, 1fr)' : 'repeat(5, 1fr)'} gap={4}>
               {filteredData.map(product => (
                    <ProductById key={product.id} product={product} />
               ))}
          </Grid>
     } else {
          content = <Flex w='100%' h='60vh' justify='center' align='center'>
               <Text>No Item Added</Text>
          </Flex>
     }

     return content;
};

export default ProductContent;
