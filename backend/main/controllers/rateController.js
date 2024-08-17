const dbconn = require("../config/dbcon");

const getRate = async (req, res) => {
    const {trackingID, id} = req.body;
    await dbconn.query("SELECT * FROM tbl_ratings WHERE trackingID = ?", [trackingID], (err, result) => {
        if(err){
            console.log(err);
            return;
        }
        res.status(200).json({msg: result[0].rate})
    })
    await dbconn.query('UPDATE tbl_notification SET isOpen = ? WHERE id = ?', [1, id], (err, result) => {
        if(err){
            console.log(err);
            return;
        }
    })
}

const createRate = async (req, res) => {
    const { rating, products, id, trackingID } = req.body;
    const sqlQuery = 'INSERT INTO tbl_ratings (productID, rate, trackingID) VALUES (?,?,?)';
    
    try {
        for (let i = 0; i < products.length; i++) {
            const id = products[i];
            await dbconn.query(sqlQuery, [id, rating, trackingID]);
        }
        const updateQuery = "UPDATE tbl_order SET status=? WHERE id=?";
        dbconn.query(updateQuery, [5, id], (err, result) => {
            if(err) return;
            res.status(200).json({ msg: "Thank you for rating our products" });
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    createRate,
    getRate
}
