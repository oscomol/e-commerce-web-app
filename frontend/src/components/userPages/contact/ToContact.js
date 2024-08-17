import { Flex, Box, Badge, Text, useMediaQuery } from '@chakra-ui/react';
import { FaPhone, FaLocationPin, FaFolderOpen } from "react-icons/fa6";
import Icons from './Icons';
import ContactList from './ContactList';

const ToContact = () => {
    const [isMax900] = useMediaQuery('(max-width: 900px)')
    const address = [
        {
            building: 'Welfield Group Contracting',
            place: ['146 Yuma Street', ' Denver CO 80223']
        },
        {
            building: 'Northern Division Office',
            place: ['1270 Automation Drive', 'Windsor, CD 80550']
        },
    ]

    const contact = [
        {
            building: 'Welfield Group Contracting',
            place: ['303.428.2011 phone', '303.202.0466 facsimile']
        },
        {
            building: 'Welfield 24/7 Service Department',
            place: ['303.428.2011']
        },
        {
            building: 'Northern Division Office',
            place: ['303.428.2011 phone', '303.202.0466 facsimile']
        },
        {
            building: 'Wyoming Office',
            place: ['307.757.7967 phone']
        }
    ]

    const emails = [
        {
            building: 'Request For Proposal',
            place: ['christianlomocso767@gmail.com']
        },
        {
            building: 'Electrical Service Calls',
            place: ['servicechristianlomocso767@gmail.com']
        },
        {
            building: 'Employment opportunities',
            place: ['employmentchristian@gmail.com']
        },
    ]

    return (
        <Flex w='100%' h='auto' flexDirection={isMax900 ? 'column':'row'} justify={isMax900 ? 'flex-start':'space-between'} align={isMax900 ? 'center':'flex-start'}>
            <Flex w={isMax900 ? '100%':'32%'} align='center' flexDir='column' gap='20px' p='20px'>
                <Icons
                    icon={<FaLocationPin/>}
                    label="Address"
                />
                {address.map(add => (
                    <ContactList
                        key={add.place}
                        data={add}
                    />
                ))}
            </Flex>


            <Flex w={isMax900 ? '100%':'32%'} align='center' flexDir='column' gap='20px' p='20px'>
                <Icons
                    icon={<FaPhone/>}
                    label="Phone"
                />
                {contact.map(add => (
                    <ContactList
                        key={add.place}
                        data={add}
                    />
                ))}
            </Flex>
            <Flex w={isMax900 ? '100%':'32%'} align='center' flexDir='column' gap='20px' p='20px'>
                <Icons
                    icon={<FaFolderOpen/>}
                    label="Email"
                />
                {emails.map(add => (
                    <ContactList
                        key={add.place}
                        data={add}
                    />
                ))}
            </Flex>
           
        </Flex>
    );
};

export default ToContact;