import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Text,
    HStack,
    Button
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useCreateSliceMutation } from '../../../api/users/rateSlice';
import { socket } from '../../../../socket/socket';
import useAuth from '../../../../hooks/useAuth';

const Rate = ({ rate, trackingID, products, orderId }) => {
    const {id, username} = useAuth()
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [rating, setRating] = useState(0);
    const stars = [
        { id: 1, isCheck: false },
        { id: 2, isCheck: false },
        { id: 3, isCheck: false },
        { id: 4, isCheck: false },
        { id: 5, isCheck: false }
    ]
    const [rateOrder, {isLoading}] = useCreateSliceMutation();

    useEffect(() => {
        onOpen();
    }, [rate]);

    const handleRate = (id) => {
        setRating(id)
    }

    const handleRatings = async () => {
        const initialData = {rating, products, id: orderId, trackingID};
        try{
            const res = await rateOrder(initialData).unwrap();
            if(res){
                socket.emit('orderRated', {id, trackingID, username});
            }
        }catch(err){
            console.log(err)
        }finally{
            onClose();
        }
    }

    return (
        <Modal blockScrollOnMount={true} size='sm' isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Rate order</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text as='p'>Did you like the products ?</Text>
                    <HStack gap='2' mt='10px'>
                        {stars.map(star => (
                            <Text key={star.id} onClick={()=>handleRate(star.id)} color={star.id <= rating ? 'orange':'gray'}><FaStar /></Text>
                        ))}
                    </HStack>
                </ModalBody>
                <ModalFooter>
                    <>
                        <Button colorScheme='orange' size='sm' variant='ghost' float='left' onClick={handleRatings} isDisabled={isLoading}>Rate</Button>
                        <Button colorScheme='red' size='sm' variant='ghost' ml='5px' float='left' onClick={onClose} isDisabled={isLoading}>Cancel</Button>
                    </>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default Rate;