const create = require("./common/create");
const update = require("./common/update");
const deleteQuery = require("./common/delete");
const getByID = require("./common/getByID");

const trackingID = require("../middleware/randomString");

const dbconn = require("../config/dbcon");

const createProductOrder = require("./productOrderedController");

const getAllOrder = async (req, res) => {

    const sqlQuery = `SELECT * FROM tbl_order`;
    const sqlQueryForGettingPro = `SELECT * FROM tbl_productordered WHERE orderID = ?`;

    try {
        await dbconn.query(sqlQuery, async (err, result) => {
            if (err) return res.status(500).json({ msg: "Server error" });
            if (result?.length) {
                try {
                    const orderData = [];
                    for (const order of result) {
                        const orderID = order.id;
                        const products = await getProduct(orderID, sqlQueryForGettingPro);
                        orderData.push({ ...order, products });
                    }
                    res.status(200).json(orderData);
                } catch (err) {
                    console.error(err);
                    res.status(500).json({ msg: "Server error" });
                }
            } else {
                res.status(400).json({ msg: "No order yet" });
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
}

const getOrderByID = async (req, res) => {
    const { userID } = req.params;

    console.log("CALlED");

    if (!userID) return res.status(400).json({ msg: "Some fields are missing" });

    const sqlQuery = `SELECT * FROM tbl_order WHERE userID = ?`;
    const sqlQueryForGettingPro = `SELECT * FROM tbl_productordered WHERE orderID = ?`;

    try {
        await dbconn.query(sqlQuery, [userID], async (err, result) => {
            if (err) return res.status(500).json({ msg: "Server error" });
            if (result?.length) {
                try {
                    const orderData = [];
                    for (const order of result) {
                        const orderID = order.id;
                        const products = await getProduct(orderID, sqlQueryForGettingPro);
                        orderData.push({ ...order, products });
                    }
                    res.status(200).json(orderData);
                } catch (err) {
                    console.error(err);
                    res.status(500).json({ msg: "Server error" });
                }
            } else {
                res.status(400).json({ msg: "No order yet" });
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
};

async function getProduct(orderID, sqlQueryForGettingPro) {
    return new Promise((resolve, reject) => {
        dbconn.query(sqlQueryForGettingPro, [orderID], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

const createOrder = async (req, res) => {
    const { userID, dateOrdered, status, shippingFee, productIDs } = req.body;

    if (!userID || !dateOrdered || !status || !productIDs?.length) {
        return res.status(400).json({ msg: "Some fields are missing" });
    }

    const sqlQuery = "INSERT INTO tbl_order (userID, dateOrdered, status, shippingFee, trackingID) VALUE(?,?,?,?,?)";
    const data = [userID, dateOrdered, status, shippingFee, trackingID() + '' + userID];

    try {
        await dbconn.query(sqlQuery, data, async (err, result) => {
            if (err) {
                res.status(500).json('Server error');
            }
            const orderID = result.insertId;
            await createProductOrder(orderID, productIDs, res);
        });
    } catch (err) {
        return res.status(500).json('Server error')
    }

}

const updateOrder = async (req, res) => {
    const { status, id, deliveryAttempt, recievedDate } = req.body;

    if (!status || !id) return res.status(400).json({ msg: "Some fields are missing" });

    let sqlStr = "";
    let data = [];

    if (deliveryAttempt) {
        sqlStr += "deliveryAttempt=?,";
        data = [...data, deliveryAttempt]
    }

    if (recievedDate) {
        sqlStr += "recievedDate=?,";
        data = [...data, recievedDate]
    }

    if (status) {
        sqlStr += "status=?,";
        data = [...data, status]
    }

    const errMSG = "Error updating order";
    const successMSG = "Order updated succesfully";
    const sqlQuery = `UPDATE tbl_order SET ${sqlStr.slice(0, sqlStr.lastIndexOf(','))} WHERE id=?`;
    await update(res, sqlQuery, errMSG, successMSG, [...data, id]);
}

const deleteOrder = async (req, res) => {
    const { id } = req.body;

    if (!id) return res.status(400).json({ msg: "Some fields are missing" })

    const errMSG = "Error deleting order";
    const successMSG = "Order deleted succesfully";
    const sqlQuery = "DELETE FROM tbl_order WHERE id=?";
    const data = [id];

    await deleteQuery(res, errMSG, successMSG, sqlQuery, data);
}

module.exports = {
    getOrderByID,
    createOrder,
    updateOrder,
    deleteOrder,
    getAllOrder
}