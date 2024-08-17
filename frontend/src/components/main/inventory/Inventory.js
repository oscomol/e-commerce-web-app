import { Box, useMediaQuery } from "@chakra-ui/react";
import Main from "../Main";
import InventoryContent from "./InventoryContent";
import SelectCategory from "./SelectCategory";
import { useState } from "react";

const Inventory = () => {
    const [isMax600] = useMediaQuery('(max-width: 600px)')
    const [selected, setSelected] = useState("Category(All)");
  
    return (
        <>
            <Main
                title="Inventory"
                otherBtn={<SelectCategory {...{selected, setSelected}} />}
            />
            <Box p={isMax600 ? '15px':'30px'}>
               <InventoryContent selected={selected} />
            </Box>
        </>
    );
};

export default Inventory;