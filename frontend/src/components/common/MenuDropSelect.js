import {
    Menu
  } from '@chakra-ui/react'

const MenuDropSelect = ({btn, body}) => {

    return (
        <Menu>
        {btn}
        {body}
        </Menu>
    );
};

export default MenuDropSelect;