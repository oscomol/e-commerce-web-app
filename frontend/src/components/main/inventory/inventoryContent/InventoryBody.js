import { Box } from '@chakra-ui/react';

import InventoryContent from './InventoryContent';

const InventoryBody = ({selected, from, to, sort}) => {
    return <InventoryContent selected={selected}  from={from} to={to} sort={sort}  />
};

export default InventoryBody;