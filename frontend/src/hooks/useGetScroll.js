import { useState, useEffect } from 'react';

const useGetScroll = () => {
    const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
    const [scrollingDown, setScrollingDown] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            setScrollingDown(prevScrollPos < currentScrollPos);
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPos]);

    return prevScrollPos;
};

export default useGetScroll;