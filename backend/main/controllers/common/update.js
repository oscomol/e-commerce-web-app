const dbconn = require("../../config/dbcon");

const update = async (res, sqlQuery, errMSG, successMSG, data) => {
    try{
        await dbconn.query(sqlQuery, data, (err, result) => {
            if(err){
                console.log(err)
                return res.status(500).json({msg: errMSG})
               
            }
            res.status(200).json({msg: successMSG})
        })
    }catch(err){
        return res.status(500).json({msg: errMSG})
    }
}

module.exports = update;