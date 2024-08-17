import { Badge, Box, Button, Flex, MenuButton, MenuItem, MenuList, Spacer, Text, useMediaQuery } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import InventoryBody from './inventoryContent/InventoryBody';
import DateOptions from './inventoryContent/DateOptions';
import MenuDropSelect from '../../common/MenuDropSelect';
import AdditionalExpense from './inventoryContent/AdditionalExpense';
import { FaCaretDown } from 'react-icons/fa';

const InventoryContent = ({selected}) => {
    const [isMax600, isMax820, isMax950, isMax1000] = useMediaQuery(['(max-width: 600px)','(max-width: 820px)', '(max-width: 950px)', '(max-width: 1000px)']);
    const [dir, setDir] = useState('row');

    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    const [sort, setSort] = useState("Sort");

    useEffect(() => {
        if(isMax820){
            setDir('column')
        }else{
            if(isMax950){
                setDir('row')
            }else{
                if(isMax1000){
                    setDir('column')
                }else{
                    setDir('row')
                }
            }
        }
    }, [isMax820, isMax950, isMax1000]);

    return (
        <>
            <Badge fontSize='xxl' bg='none' mb='20px'>Sales inventory</Badge>
            <Flex mb='20px' align='center'>
                <Box>
                    <Text>Date options</Text>
                    <DateOptions {...{from, setFrom, to, setTo}} />
                </Box>
                <Spacer />
                <Box  pt={(dir === 'column') ? '10px':'20px'}>
                <MenuDropSelect
                    btn={<MenuButton as={Button} rightIcon={<FaCaretDown/>}>
                        {sort}
                    </MenuButton>}
                    body={<MenuList>
                        <MenuItem onClick={()=>setSort('Sold')}>Sold</MenuItem>
                        <MenuItem onClick={()=>setSort('Sales')}>Sales</MenuItem>
                        <MenuItem  onClick={()=>setSort('Income')}>Income</MenuItem>
                    </MenuList>}
                />
                </Box>
            </Flex>
            <InventoryBody selected={selected} from={from} to={to} sort={sort}/>
        </>
    );
};

export default InventoryContent;