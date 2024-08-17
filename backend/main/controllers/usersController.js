const create = require("./common/create");
const getAll = require("./common/getAll");
const update = require("./common/update");
const deleteQuery = require("./common/delete");

const dbcon = require("../config/dbcon");
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const { setToken } = require("./common/respondToken");
const { logout } = require("./authController");
const { updateAddress } = require("./addressController");

const getUsers = async (req, res) => {
    const sqlQuery = 'SELECT tbl_user.role, tbl_user.isBlock, tbl_user.id, tbl_user.addressID, tbl_user.firstname, tbl_user.lastname, tbl_user.middlename, tbl_user.bday, tbl_user.username, tbl_user.gmail, tbl_user.phone, tbl_address.blockNo, tbl_address.sitio, tbl_address.city, tbl_address.province, tbl_address.barangay FROM tbl_user INNER JOIN tbl_address ON tbl_address.id = tbl_user.addressID';
    const errMSG = "Error getting user data";
    const successMSG = "Success getting user data";

    await getAll(res, sqlQuery, errMSG, successMSG);
}

const saveAddress = async (req) => {
    try {
        const { blockNo, sitio, barangay, city, province } = req.body;
        const sqlQuery = "INSERT INTO tbl_address(blockNo, sitio, barangay, city, province) VALUES(?,?,?,?,?)";
        return new Promise((resolve, reject) => {
            dbcon.query(sqlQuery, [blockNo, sitio, barangay, city, province], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.insertId);
                }
            });
        });
    } catch (err) {
        console.log(err);
        throw err; // Propagate the error
    }
};

const createUser = async (req, res) => {
    try {
        const { username, password, gmail, phone, bday, role, firstname, lastname, middlename } = req.body;

        const hashedPwd = await bcrypt.hash(password, 10);

        const addressSaved = await saveAddress(req);

        if (addressSaved) {
            const errMSG = "Error creating account";
            const successMSG = "Account saved successfully";
            const sqlQuery = "INSERT INTO tbl_user (username, password, gmail, phone, bday, role, firstname, lastname, middlename, addressID, isBlock) VALUES(?,?,?,?,?,?,?,?,?,?,?)";
            const data = [username, hashedPwd, gmail, phone, bday, role, firstname, lastname, middlename, addressSaved, 1];

            await dbcon.query(sqlQuery, data, (err, result) => {
                if (err) {
                    console.log("Error saving data: " + err)
                    res.status(500).json('Server error');
                }
                if (role == 2) {
                    setToken(res, { id: result.insertId, role, username });
                } else {
                    res.status(200).json({ msg: successMSG, id: result.insertId })
                }

            });
        }
    } catch (err) {
        console.log(err);
        // Handle error response
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const updateUser = async (req, res) => {
    const { username, password, gmail, phone, bday, firstname, lastname, middlename, id, role } = req.body;

    if (!id) return res.status(400).json({ msg: "Some fields are missing" })

    const errMSG = "Error updating account";
    const successMSG = "Account updated succesfully";
    let sqlQuery = "";
    let data = "";
    if (password) {
        const hashedPwd = await bcrypt.hash(password, 10);
        sqlQuery = "UPDATE tbl_user SET username=?, gmail=?, phone=?, bday=?, firstname=?, lastname=?, middlename=?, password=? WHERE id=?";
        data = [username, gmail, phone, bday, firstname, lastname, middlename, hashedPwd, id];
    } else {
        sqlQuery = "UPDATE tbl_user SET username=?, gmail=?, phone=?, bday=?, firstname=?, lastname=?, middlename=? WHERE id=?";
        data = [username, gmail, phone, bday, firstname, lastname, middlename, id];
    }

    await dbcon.query(sqlQuery, data, (err, result) => {
            if(err){
                console.log(err)
                return res.status(500).json({msg: errMSG})
            }
            updateAddress(req, res, {id, username, role});
        })
}

const handleBlocking = async (req, res) => {
    const { isBlock, id } = req.body;

    if (!id) return res.status(400).json({ msg: "Some fields are missing" })

    const errMSG = "Error blocking/unblocking account";
    const successMSG = "Account updated succesfully";
    let sqlQuery = "UPDATE tbl_user SET isBlock=? WHERE id=?";;

    await update(res, sqlQuery, errMSG, successMSG, [isBlock, id]);
}

const deleteUser = async (req, res) => {
    const { id } = req.body;

    if (!id) return res.status(400).json({ msg: "Some fields are missing" })

    const errMSG = "Error deleting account";
    const successMSG = "Account deleted succesfully";
    const sqlQuery = "DELETE FROM tbl_user WHERE id=?";
    const data = [id];

    await dbcon.query(sqlQuery, data, (err, result) => {
        if(err) {
          console.log("Error saving data: " + err)
          res.status(500).json('Server error');
        }
        logout(req, res);
      });
}

const getUserByID = async (req, res) => {
    const { id } = req.body;
    if (!id) return res.status(500).json({ msg: "ID params not found" });
    const sqlQuery = 'SELECT tbl_user.username, tbl_user.gmail, tbl_user.phone, tbl_address.blockNo, tbl_address.sitio, tbl_address.city, tbl_address.province, tbl_address.barangay FROM tbl_user INNER JOIN tbl_address ON tbl_address.id = tbl_user.addressID WHERE tbl_user.id = ?'

    await dbcon.query(sqlQuery, [id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ msg: "Server error" });
        }
        console.log(result)
    })
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getUserByID,
    handleBlocking
}