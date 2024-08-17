import { useDispatch, useSelector } from "react-redux";
import { selectAllUser, useDeleteUserMutation, useUpdateUserMutation } from "../api/slices/userSlice";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import CustomInp from "./CustomInp";
import { Flex, Button, Badge } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../socket/socket";
import { setCredentials } from "../api/slices/authSliceData";

const UserEdit = ({ onClose }) => {
  const users = useSelector(selectAllUser)
  const { id, role } = useAuth();

  const [dateType, setDateType] = useState('text');

  const [isLoading, setIsLoading] = useState(false);

  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation(); 

  //Personal data 
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [mName, setMName] = useState("");
  const [gmail, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bday, setBday] = useState("");

  //Address
  const [block, setBlock] = useState('');
  const [sitio, setSitio] = useState('');
  const [city, setCity] = useState('');
  const [barangay, setBarangay] = useState('');
  const [province, setProvince] = useState('');
  const [addressID, setAddressID] = useState('');

  //Username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const owner = users.find(user => user.id === id);

    if (owner) {
      setFName(owner.firstname)
      setLName(owner.lastname)
      setMName(owner.middlename)
      setEmail(owner.gmail)
      setPhone(owner.phone)
      setBday(owner.bday)
      setBlock(owner.blockNo)
      setSitio(owner.sitio)
      setCity(owner.city)
      setBarangay(owner.barangay)
      setProvince(owner.province)
      setUsername(owner.username)
      setAddressID(owner.addressID);
    }

  }, [users])

  const isDataComplete = [fName, lName, mName, gmail, phone, bday, sitio, city, barangay, province, username].every(Boolean);

  const handleUpdate = async () => {
    setIsLoading(true)
    try{
      let initialData = {firstname: fName, lastname: lName, middlename: mName, gmail, phone, bday, sitio, city, barangay, province, username, id, addressID, role};
      if(password && password === confirmPass) initialData = {...initialData, password};
      if(block) initialData = {...initialData, blockNo: block};
      const res = await updateUser(initialData).unwrap();
      if(res){
        dispatch(setCredentials(res.accesToken))
      }
    }catch(err){
      console.log(err);
    }finally{
      onClose();
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    try{
      const res = await deleteUser({id}).unwrap();
      if (res?.message === "logout") {
          navigate("/");
          socket.disconnect();
      }
    }catch(err){
      console.log(err)
    }
  }

  return (
    <Flex flexDir='column' gap='25px' mb='6px'>
      <Badge fontSize="lg" color="black.500" bg="none" p='0'>Personal data</Badge>
      <CustomInp {...{ value: fName, setValue: setFName, labelTag: "First name", type: 'text' }} />
      <CustomInp {...{ value: lName, setValue: setLName, labelTag: "Last name", type: 'text' }} />
      <CustomInp {...{ value: mName, setValue: setMName, labelTag: "Middle name", type: 'text' }} />
      <CustomInp {...{ value: gmail, setValue: setEmail, labelTag: "Email", type: 'text' }} />
      <CustomInp {...{ value: phone, setValue: setPhone, labelTag: "Phone", type: 'number' }} />
      <CustomInp {...{ value: bday, setValue: setBday, labelTag: "Birthdate", type: dateType, isDate: true, setDateType: setDateType }} />

      <Badge fontSize="lg" color="black.500" bg="none" p='0' mt='2'>Address</Badge>
      <CustomInp {...{ value: block, setValue: setBlock, labelTag: "Block number(OPTIONAL)", type: 'number' }} />
      <CustomInp {...{ value: sitio, setValue: setSitio, labelTag: "Street", type: 'text' }} />
      <CustomInp {...{ value: city, setValue: setCity, labelTag: "City", type: 'text' }} />
      <CustomInp {...{ value: barangay, setValue: setBarangay, labelTag: "Barangay", type: 'text' }} />
      <CustomInp {...{ value: province, setValue: setProvince, labelTag: "Province", type: 'text' }} />

      <Badge fontSize="lg" color="black.500" bg="none" p='0' mt='2'>Username and password</Badge>
      <CustomInp {...{ value: username, setValue: setUsername, labelTag: "Username", type: 'text' }} />
      <CustomInp {...{ value: password, setValue: setPassword, labelTag: "New Password", type: 'password' }} />
      <CustomInp {...{ value: confirmPass, setValue: setConfirmPass, labelTag: "Confirm Password", type: 'password' }} />
      <Flex justify='flex-end' gap='3'>
        <Button variant="outline" size="sm" colorScheme='green' isDisabled={!isDataComplete || isLoading} onClick={handleUpdate}>Update</Button>
        <Button variant="outline" size="sm" colorScheme='red' isDisabled={isLoading} onClick={handleDelete}>Remove</Button>
      </Flex>
    </Flex>
  );
};

export default UserEdit;