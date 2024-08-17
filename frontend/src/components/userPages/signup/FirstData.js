import React, { useEffect, useState } from 'react';
import CustomInp from '../../common/CustomInp';
import { Text } from '@chakra-ui/react';

const FirstData = ({fName, setFName, lName, setLName, mName, setMName, gmail, setEmail, phone, setPhone, bday, setBday, setiSNextActive}) => {
   
    const [dateType, setDateType] = useState('text');
    const personalData = [fName, lName, mName, gmail, phone, bday].every(Boolean);

    useEffect(() => {
        setiSNextActive(personalData);

        return () => {
            setiSNextActive(false);
        }
    }, [personalData]);
    
    return (
        <>
            <CustomInp {...{ value: fName, setValue: setFName, labelTag: "First name", type: 'text' }} />
            <CustomInp {...{ value: lName, setValue: setLName, labelTag: "Last name", type: 'text' }} />
            <CustomInp {...{ value: mName, setValue: setMName, labelTag: "Middle name", type: 'text' }} />
            <CustomInp {...{ value: gmail, setValue: setEmail, labelTag: "Email", type: 'text' }} />
            <CustomInp {...{ value: phone, setValue: setPhone, labelTag: "Phone", type: 'number' }} />
            <CustomInp {...{ value: bday, setValue: setBday, labelTag: "Birthdate", type: dateType, isDate: true, setDateType: setDateType }} />
        </>
    );
};

export default FirstData;