import { Button } from '@chakra-ui/react';

const BackToTop = () => {
    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <Button onClick={handleScrollToTop} position='fixed' bottom='10px' right='10px' colorScheme='green' zIndex={999}>
            Scroll To Top
        </Button>
    );
};

export default BackToTop;