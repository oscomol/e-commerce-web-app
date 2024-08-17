import { RadioGroup, Stack, Radio } from "@chakra-ui/react";

const OrderDisplay = ({orderDisplay, setOrderDisplay}) => {

    return (
        <RadioGroup onChange={setOrderDisplay} value={orderDisplay}>
            <Stack spacing={5} direction='row'>
                <Radio value='1'>Per order</Radio>
                <Radio value='2'>By user</Radio>
                <Radio value='3'>By product</Radio>
            </Stack>
        </RadioGroup>
    );
};

export default OrderDisplay;