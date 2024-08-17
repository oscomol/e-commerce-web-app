import { Badge, Box, Img, Text, Flex, useMediaQuery, Avatar } from "@chakra-ui/react";

const Cards = ({ about, show, photo }) => {
   const [isMax730] = useMediaQuery('(max-width: 600px)');

   return (
      <Box>
         <Flex align='center' gap='10px'>
            {photo && <Avatar size='sm' />}
            <Badge bg='none' color='alpha.500' display='flex' align='center' gap='10px'>{about.header}</Badge>
         </Flex>
         <Text as='p' pt='10px'>
            {about.body}
         </Text>
         {
            show && <Flex gap='5px' mt='10px' flexDir={isMax730 ? 'column' : 'row'}>
               <Img
                  src={`./photos/about/${about.photo[0]}`}
                  w={isMax730 ? '100%' : '50%'}
                  borderRadius='md'
               />
               <Img
                  src={`./photos/about/${about.photo[1]}`}
                  w={isMax730 ? '100%' : '50%'}
                  borderRadius='md'
               />
            </Flex>
         }
         {
            about.reply && <Box p='10px'>
               - {about.reply}
            </Box>
         }
      </Box >
   );
};

export default Cards;