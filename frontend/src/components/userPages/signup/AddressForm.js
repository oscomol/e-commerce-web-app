import { useEffect, useState } from "react";
import CustomInp from "../../common/CustomInp";

const AddressForm = ({block, setBlock, sitio, setSitio, city, setCity, barangay, setBarangay, province, setProvince, setiSNextActive}) => {
    const addressData = [sitio, city, barangay, province].every(Boolean);

    useEffect(() => {
        setiSNextActive(addressData);

        return () => {
            setiSNextActive(false);
        }
    }, [addressData])

    return (
        <>
            <CustomInp {...{ value: block, setValue: setBlock, labelTag: "Block number(OPTIONAL)", type: 'number' }} />
            <CustomInp {...{ value: sitio, setValue: setSitio, labelTag: "Street", type: 'text' }} />
            <CustomInp {...{ value: city, setValue: setCity, labelTag: "City", type: 'text' }} />
            <CustomInp {...{ value: barangay, setValue: setBarangay, labelTag: "Barangay", type: 'text' }} />
            <CustomInp {...{ value: province, setValue: setProvince, labelTag: "Province", type: 'text' }} />
        </>
    );
};

export default AddressForm;