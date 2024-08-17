import { Input, Box, Text } from "@chakra-ui/react";

const FileSelectore = ({setImage, filename}) => {

    const handleImageChange = (e) => {
        const img = {
            file: e.target.files[0],
            preview: URL.createObjectURL(e.target.files[0]),
        }
        setImage(img)
    }

    return (
        <>
            <Input type='file' onChange={handleImageChange} id="fileSelect" display='none'/>
            <Box border='1px solid teal' padding='11px 25px 11px 25px' borderRadius='md'  as='label' htmlFor='fileSelect' position='relative'>
                <Text color={filename ? 'black':'gray'}>{filename ? filename:'Select a photo'}</Text>
                {filename && <Text position='absolute' top='-16px' p='0px 10px 0px 10px' bg='white' left='9px' color='gray'>Selected photo</Text>}
            </Box>
        </>
    );
};

export default FileSelectore;