import React, { useState, useEffect } from "react";
import { Flex, Img, useMediaQuery } from "@chakra-ui/react";

const RandomPhoto = ({c}) => {
    const [isMax900] = useMediaQuery('(max-width: 900px)');
    const [cImg, setC] = useState(c);
    const photos = ['im1', 'im2', 'im3', 'im4', 'im5'];

    useEffect(() => {
        const intervalId = setInterval(() => {
            setC(prevC => (prevC + 1) % photos.length);
        }, 3000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <Flex w='54%' justify='flex-end' align='center' h='100%'>
            <Img src={`./photos/home/${photos[cImg]}.png`} w={isMax900 ? '300px':'400px'} h={isMax900 ? '300px':'400px'} borderRadius='md' />
        </Flex>
    );
};

export default RandomPhoto;