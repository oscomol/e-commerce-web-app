const deleteQuery = require("./common/delete");

const seenMessage = asyns (req, res) => {
    console.log(req)
}

const deleteMessage = async (req, res) => {
    const { id } = req.body;

    if (!id) return res.status(400).json({ msg: "Some fields are missing" })

    const errMSG = "Error deleting message";
    const successMSG = "Message deleted succesfully";
    const sqlQuery = "DELETE FROM tbl_wishlist WHERE id=?";
    const data = [id];

    await deleteQuery(res, errMSG, successMSG, sqlQuery, data);
}

module.exports = {
    deleteMessage,
    seenMessage
}