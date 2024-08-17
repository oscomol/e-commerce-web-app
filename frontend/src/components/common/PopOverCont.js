import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
} from '@chakra-ui/react';

const PopOverCont = ({ btn, body }) => {
    return (
        <Popover>
            <PopoverTrigger>
                {btn}
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverBody p='0'>
                    {body}
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};

export default PopOverCont;