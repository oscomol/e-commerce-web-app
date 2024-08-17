import { Grid, Text } from '@chakra-ui/react';

import Section from '../../common/Section';
import Product from '../../../common/Product';

const Exclusive = ({row, data}) => {
   
    return (
        <Section
            title='Exlusive for you only (buy all for 2000 pesos only)'
            body={<Grid templateColumns={`repeat(${row}, 1fr)`} gap={4}>
                {data.map(data => (
                    <Product
                        key={data}
                        showBtn={false}
                    />
                ))}
            </Grid>}
            rightBtn={<Text color='green.500' fontWeight='bold'>Check now</Text>}
        />
    );
};

export default Exclusive;