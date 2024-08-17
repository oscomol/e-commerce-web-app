import { Grid, Text, useMediaQuery, Box, Flex, Img } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

import Header from '../administrator/header/Header';
import useGetScroll from '../../../hooks/useGetScroll';
import BackToTop from '../administrator/BackToTop';
import { useEffect, useState } from 'react';

const CommonLayout = ({navs}) => {
    const [isLargerThan780, isLargerThan950, isLargerThan1110] = useMediaQuery(['(max-width: 600px)', '(max-width: 950px)', '(max-width: 1100px)']);
    const [widths, setWidths] = useState({ nav: "18%", main: "82%" });
    const scroll = useGetScroll();
    const isNavFixed = scroll > 57;

    useEffect(() => {
        if (isLargerThan950) {
            setWidths({ nav: "0", main: "100%" });
        } else {
            if (isLargerThan1110) {
                setWidths({ nav: "20%", main: "80%" });
            } else {
                setWidths({ nav: "18%", main: "82%" });
            }
        }
    }, [isLargerThan1110, isLargerThan950]);

    return (
        <>
            <Header />
            <Flex>
                {(widths.nav !== "0") && (
                    <Box
                        width={widths.nav}
                        borderRight="1px solid lightgray"
                        position={isNavFixed ? "fixed" : "none"}
                        top='0'
                        height="calc(100vh - 60px)"
                        overflowY="auto"
                        zIndex={isNavFixed ? 1 : 'unset'}
                    >
                        {navs}
                    </Box>
                )}
                <Box
                    width={widths.main}
                    ml={isNavFixed ? widths.nav : 0}
                    mt={isLargerThan950 ? '8vh':0}
                >
                   <Outlet />
                </Box>
            </Flex>
            {scroll >= 58 && <BackToTop />}
        </>
    );
};

export default CommonLayout;
