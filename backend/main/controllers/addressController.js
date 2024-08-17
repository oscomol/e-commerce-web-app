const create = require("./common/create");
const update = require("./common/update");
const deleteQuery = require("./common/delete");
const dbcon = require("../config/dbcon");
const { setToken } = require("./common/respondToken");

const createAddress = async (req, res) => {
    const {blockNo, sitio, city, province, barangay} = req.body;

    if(!blockNo || !sitio || !city || !province || !barangay)  return res.status(400).json({msg: "Some fields are missing"});

    const errMSG = "Error creating address";
    const successMSG = "Address saved succesfully";
    const sqlQuery = "INSERT INTO tbl_address (blockNo, sitio, city, province, barangay) VALUE(?,?,?,?,?)";
    const data = [blockNo, sitio, city, province, barangay];

    await create(res, errMSG, successMSG, sqlQuery, data);

}

const updateAddress = async (req, res, userData) => {
    const {blockNo, sitio, city, province, barangay, id} = req.body;

    if(!id)  return res.status(400).json({msg: "Some fields are missing"})

    let sqlQuery = "UPDATE tbl_address SET sitio=?, city=?, province=?, barangay=? WHERE id=?";
    let data = [sitio, city, province, barangay, id]
    
    if(blockNo){
        sqlQuery = "UPDATE tbl_address SET blockNo = ?, sitio=?, city=?, province=?, barangay=? WHERE id=?";   
        data = [blockNo, ...data];
    }

    await dbcon.query(sqlQuery, data, (err, result) => {
        if(err){
            console.log(err);
            return;
        }
        setToken(res, userData);
    })

}

const deleteAddress = async (req, res) => {
    const {id} = req.body;
    
    if(!id)  return res.status(400).json({msg: "Some fields are missing"})

    const errMSG = "Error deleting address";
    const successMSG = "Address deleted succesfully";
    const sqlQuery = "DELETE FROM tbl_address WHERE id=?";
    const data = [id];

    await deleteQuery(res, errMSG, successMSG, sqlQuery, data);
}

module.exports = {
    createAddress,
    updateAddress,
    deleteAddress   
}