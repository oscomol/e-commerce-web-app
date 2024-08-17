import { Box, Input, Text, Textarea } from '@chakra-ui/react'
import { useEffect, useState } from 'react';

const CustomInp = ({ value, setValue, labelTag, type, setDateType, onlyRead }) => {
    const [label, setLabel] = useState({ top: '8px', zIndex: -1 });

    useEffect(() => {
        if (value) {
            setLabel({ top: '-16px', zIndex: 5 })
        }
    }, [value])

    const onBlurInp = () => {
        if (!value) {
            setLabel({ top: '8px', zIndex: -1 })
        }
        if(setDateType){
            setDateType('text');
        }
    }

    const onFocusInp = () => {
        setLabel({ top: '-16px', zIndex: 5 })
        if(setDateType){
            setDateType('date');
        }
    }

    let content;

    if (type !== 'textarea') {
        content = <>
            <Input type={type} border='1px solid teal' onFocus={onFocusInp} onBlur={onBlurInp} value={value} onChange={e => setValue(e.target.value)} isReadOnly={onlyRead} />
        </>
    } else {
        content = <Textarea border='1px solid teal' onFocus={onFocusInp} onBlur={onBlurInp} value={value} onChange={e => setValue(e.target.value)} h='70px'></Textarea>
    }

    return (
        <Box w='100%' position='relative'>
            {content}
             <Text position='absolute' left='15px' top={label.top} bg='white' paddingInline='10px' zIndex={label.zIndex} color='gray'>{labelTag}</Text>
        </Box>
    );
};

export default CustomInp;