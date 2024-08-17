import { Flex, Spacer, Text } from "@chakra-ui/react";
import { navsContainer, navsText } from "./navigation.style";
import { Link, useLocation } from "react-router-dom";

const NavsLink = ({ linkText, logo, redLink, isMouseOver, setIsMouseOver, isInDrawer, amt }) => {

    const currentLink = useLocation().pathname;

    const mouseOver = () => {
        setIsMouseOver(true);
    }

    const mouseLeave = () => {
        setIsMouseOver(false);
    }

    return (
        <Flex sx={{ ...navsContainer, bg: currentLink === redLink && !isMouseOver ? "lightgray" : "none", position: 'relative' }} onMouseOver={mouseOver} onMouseLeave={mouseLeave}>
            {amt > 0 && <Flex justify='center' align='center' w='20px' h='20px' borderRadius='50%' bg='red.300' position='absolute' top={0} left={4}>
                <Text fontWeight='bold' color='white'  fontSize='sm'>{amt}</Text>
            </Flex>}
            <Text>{logo}</Text>
            <Text sx={navsText} as={Link} to={redLink} onClick={isInDrawer}>{linkText}</Text>
        </Flex>
    );
};

export default NavsLink;
