import { useEffect, useState } from "react";
import CustomInp from "../../common/CustomInp";
import { Box, Checkbox } from "@chakra-ui/react";

const UserAndPass = ({ username, setUsername, password, setPassword, setiSNextActive }) => {
    const [confirm, setConfirm] = useState('');
    const [showPass, setShowPass] = useState(false);

    const toSubmit = username && password && (password === confirm);

    useEffect(() => {
        setiSNextActive(toSubmit)

        return () => {
            setiSNextActive(false);
        }
    }, [toSubmit]);

    return (
        <>
            <CustomInp {...{ value: username, setValue: setUsername, labelTag: "Username", type: 'text' }} />
            <CustomInp {...{ value: password, setValue: setPassword, labelTag: "Password", type: showPass ? 'text':'password', onlyRead: !username }} />
            <CustomInp {...{ value: confirm, setValue: setConfirm, labelTag: "Confirm password", type: showPass ? 'text':'password', onlyRead: !username || !password }} />
            <Box w='100%' mt='-15px'>
                <Checkbox size='md' colorScheme='green' borderColor='green' isChecked={showPass} onChange={(e)=>setShowPass(e.target.checked)}>
                    Show Password
                </Checkbox>
            </Box>
        </>
    );
};

export default UserAndPass;