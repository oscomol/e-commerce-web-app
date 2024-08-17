const dbcon = require("../../config/dbcon");

const getByID = async (res, sqlQuery, errMSG, successMSG, data) => {

    try{
        await dbcon.query(sqlQuery, data, (err, result) => {
            if(err){
                console.log(err)
                return res.status(500).json({msg: errMSG})
            }
            res.status(200).json(result)
        })
    }catch(err){
        return res.status(500).json({msg: errMSG})
    }
}

module.exports = getByID;