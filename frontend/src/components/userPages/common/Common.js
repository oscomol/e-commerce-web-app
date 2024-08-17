import { useMediaQuery, ScaleFade, Box, Heading, Badge, Flex } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

const Common = ({ page, body, center }) => {
    const [isMax1000] = useMediaQuery('(max-width: 1000px)')
    const [showLogo, setShowLogo] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowLogo(true);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <ScaleFade in={showLogo} initialScale={0.9}>
            <Box w='100%' pt='70px' pb='20px'>
                <Flex justify={center ? 'center':'flex-start'} w='100%'>
                    <Badge fontSize={center ? 'xx-large':'x-large'} bg='none' color='alpha.500' pb='20px'>{page}</Badge>
                </Flex>
                {body}
            </Box>
        </ScaleFade>
    );
};

export default Common;