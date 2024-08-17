import { Button } from "@chakra-ui/react";

const QuickMesaage = ({handleNewMessage}) => {
    const messages = [
        {
            message: 'Ok!',
            color: 'orange'
        },
        {
            message: 'Thank you!',
            color: 'blue'
        },
        {
            message: 'Payment done',
            color: 'yellow'
        },
        {
            message: 'Order recieved',
            color: 'purple'
        },
        {
            message: 'Good day!',
            color: 'red'
        }
    ];

    return (
        <>
            {messages.map(mess => (
                <Button colorScheme={mess.color} size='lg' key={mess.message} onClick={()=>handleNewMessage(mess.message)}>{mess.message}</Button>
            ))}
        </>
    );
};

export default QuickMesaage;