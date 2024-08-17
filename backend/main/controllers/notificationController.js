const dbconn = require("../config/dbcon");
const create = require("./common/create");
const deleteQuery = require("./common/delete");
const getById = require("./common/getByID");

const getNotificationById = async (req, res) => {
    const { recieverID } = req.params;

    if (!recieverID) return res.status(400).json({ msg: "Some fields are missing" });

    const sqlQuery = "SELECT * FROM tbl_notification WHERE recieverID = ?";
    const errMSG = "Error getting notification data";
    const successMSG = "Success getting notification data";

    await getById(res, sqlQuery, errMSG, successMSG, [recieverID]);
}

const createNotification = async (req, res) => {
    const { recieverID, notification, date, time } = req.body;

    if (!recieverID || !notification || !date || !time) {
        return res.status(400).json({ msg: "Some fields are missing" });
    }

    const errMSG = "Error creating notification";
    const successMSG = "Notification saved succesfully";
    const sqlQuery = "INSERT INTO tbl_notification (recieverID, notification, date, time) VALUE(?,?,?,?)";
    const data = [recieverID, notification, date, time];

    await create(res, errMSG, successMSG, sqlQuery, data);
}

const deleteNotification = async (req, res) => {
    const { id } = req.body;

    if (!id) return res.status(400).json({ msg: "Some fields are missing" })

    const errMSG = "Error deleting notification";
    const successMSG = "Notification deleted succesfully";
    const sqlQuery = "DELETE FROM tbl_notification WHERE id=?";
    const data = [id];

    await deleteQuery(res, errMSG, successMSG, sqlQuery, data);
}

const seenNotif = async (req, res) => {
    const {id} = req.body;
  
    if(!id)   res.status(404).json({ msg: 'File not found' });

    const sqlQuery = "UPDATE tbl_notification SET isOpen = ? WHERE id=?";
    await dbconn.query(sqlQuery, [1, id], (err, result) => {
        if(err){
            console.log(err)
            return;
        }
        res.status(200).json({msg: "Success"});
    })

  }

module.exports = {
    getNotificationById,
    createNotification,
    deleteNotification,
    seenNotif
}