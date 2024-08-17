import { useMediaQuery } from "@chakra-ui/react";

const useResponsive = () => {
   const [isMax720, isMax900, isMax950, isMax1100, isMax1350] = useMediaQuery(['(max-width: 720px)', '(max-width: 900px)', '(max-width: 950px)', '(max-width: 1100px)', '(max-width: 1350px)']);

   return {isMax720, isMax900, isMax950, isMax1100, isMax1350}
};

export default useResponsive;