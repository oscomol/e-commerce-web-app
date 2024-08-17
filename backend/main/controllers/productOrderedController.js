const dbconn = require("../config/dbcon");

const createProductOrder = async (orderID, productIDs, res) => {
    const sqlQuery = "INSERT INTO tbl_productordered (orderID, quantity, productID) VALUES(?,?,?)";
    const promises = []; 

    try {
        for (let x = 0; x < productIDs?.length; x++) {
            promises.push(new Promise((resolve, reject) => {
                dbconn.query(sqlQuery, [orderID, productIDs[x].quantity, productIDs[x].productID], (err, result) => {
                    if (err) {
                        console.log("Error saving data: " + err);
                        reject(err);
                    } else {
                        resolve(result); 
                    }
                });
            }));
        }

        await Promise.all(promises);

        res.status(200).json({ msg: 'All product orders created successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json('Server error');
    }
}

module.exports = createProductOrder;
