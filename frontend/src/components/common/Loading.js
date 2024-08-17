import { CircularProgress, Flex } from '@chakra-ui/react'

const Loading = () => {
    return (
        <Flex
        w="100vw"
        h="100vh"
        justify="center"
        align="center"
        position="fixed"
        top="0"
        left="0"
        zIndex="999"
        bgColor="rgba(0, 0, 0, 0.5)"
      >
        <Flex
          w="200px"
          h="200px"
          justify="center"
          align="center"
          boxShadow="rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px;"
        >
          <CircularProgress isIndeterminate color="green.300" />
        </Flex>
      </Flex>
    );
};

export default Loading;