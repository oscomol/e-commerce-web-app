const create = require("./common/create");
const getById = require("./common/getByID");
const getAll = require("./common/getAll");
const deleteQuery = require("./common/delete");

const getLogsById = async (req, res) => {
    //get logs by user ID
}

const getAllLogs = async (req, res) => {
    const sqlQuery = "SELECT * FROM tbl_logs";
    const errMSG = "Error getting user data";
    const successMSG = "Success getting user data";

    await getAll(res, sqlQuery, errMSG, successMSG);
}

const createLogs = async (req, res) => {
    const { adminID, action, date, time } = req.body;

    if (!adminID || !action || !date || !time) return res.status(400).json({ msg: "Some fields are missing" });

    const errMSG = "Error creating activity logs";
    const successMSG = "Activity logs saved succesfully";
    const sqlQuery = "INSERT INTO tbl_logs (adminID, action, date, time) VALUE(?,?,?,?)";
    const data = [adminID, action, date, time];

    await create(res, errMSG, successMSG, sqlQuery, data);
}

const deleteLogs = async (req, res) => {
    const { id } = req.body;

    if (!id) return res.status(400).json({ msg: "Some fields are missing" })

    const errMSG = "Error deleting activity logs";
    const successMSG = "Activity logs deleted succesfully";
    const sqlQuery = "DELETE FROM tbl_logs WHERE id=?";
    const data = [id];

    await deleteQuery(res, errMSG, successMSG, sqlQuery, data);
}

module.exports = {
    getLogsById,
    createLogs,
    deleteLogs,
    getAllLogs
}