import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NavsLink = ({link}) => {
    
    return (
        <Text fontSize='lg' borderBottom={link.active ? "2px solid orange":'none'} p='0 10px 0 10px' color={link.active ? 'orange':'none'} as={Link} to={link.link} _hover={{color: 'orange'}}>{link.name}</Text>
    );
};

export default NavsLink;