const dbconn = require("../../config/dbcon");

const deleteQuery = async (res, errMSG, successMSG, sqlQuery, data) => {
    try {
        await dbconn.query(sqlQuery, data, (err, result) => {
          if(err) {
            console.log("Error saving data: " + err)
            res.status(500).json('Server error');
          }
          res.status(200).json({msg: successMSG})
        });
    } catch (error) {
        console.error(`${errMSG}: ${error}`);
        return res.status(500).json('Server error')
    }
}

module.exports = deleteQuery;