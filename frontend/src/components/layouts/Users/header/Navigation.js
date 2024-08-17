import { Button, HStack, Text, useMediaQuery } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import NavsLink from "./NavsLink";
import { useEffect, useState } from "react";
import useGetScroll from "../../../../hooks/useGetScroll";

const Navigation = () => {
    const [isMax770, isMax950] = useMediaQuery(['(max-width: 770px)', '(max-width: 1000px)']);
    const [links, setLinks] = useState([
        {
            name: 'Home',
            link: '/',
            active: true
        },
        {
            name: 'About',
            link: 'about',
            active: false
        },
        {
            name: 'Contact',
            link: 'contact',
            active: false
        },
        {
            name: 'Feedback',
            link: 'feedback',
            active: false
        },
        {
            name: 'FAQ',
            link: 'faq',
            active: false
        }
    ]);

    const currentLocation = useLocation().pathname;

    useEffect(() => {
        let currentPage = currentLocation?.slice(1).toLocaleUpperCase();
        if(!currentPage){
            currentPage = "HOME";
        }
        const activeLink = links.map(link => {
            if(link.name.toLocaleUpperCase() === currentPage){
                link.active = true;
            }else{
                link.active = false;
            }
            return link;
        })
        setLinks(activeLink)
    }, [currentLocation])

    return (
        < >
            {!isMax770 && <HStack gap={isMax950 ? 2:5} cursor='default' mr={isMax950 ? 3:5}>

                {links.map(link => (
                    <NavsLink key={link.name} link={link}/>
                ))}
            </HStack>}

            <HStack gap={3}>
                <Button colorScheme='blue' size='sm' as={Link} to='/sign-up'>
                    Sign up
                </Button>
                <Button colorScheme='green' size='sm' as={Link} to='/sign-in'>
                    Sign in
                </Button>
            </HStack>
        </>
    );
};

export default Navigation;