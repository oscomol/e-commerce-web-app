import { VStack, Flex, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FaBookOpen, FaHome, FaMagic, FaPhone } from 'react-icons/fa';
import { FaHouse, FaNoteSticky, FaQuestion } from 'react-icons/fa6';
import DrawerRedNavs from './DrawerRedNavs';
import { useLocation } from 'react-router-dom';

const DrawerLinks = ({closeDrawer}) => {
    const [links, setLinks] = useState([
        {
            name: 'Home',
            link: '/',
            active: true,
            icon: <FaHome/>
        },
        {
            name: 'About',
            link: 'about',
            active: false,
            icon: <FaBookOpen />
        },
        {
            name: 'Contact',
            link: 'contact',
            active: false,
            icon: <FaPhone />
        },
        {
            name: 'Feedback',
            link: 'feedback',
            active: false,
            icon: <FaNoteSticky />
        },
        {
            name: 'FAQ',
            link: 'faq',
            active: false,
            icon: <FaQuestion/>
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
        <VStack>
            {links.map(link => (
                <DrawerRedNavs key={link.name} link={link} closeDrawer={closeDrawer} />
            ))}
        </VStack>
    );
};

export default DrawerLinks;