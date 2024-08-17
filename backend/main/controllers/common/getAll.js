const dbcon = require("../../config/dbcon");

const getAll = async (res, sqlQuery, errMSG, successMSG) => {
    try{
        await dbcon.query(sqlQuery, (err, result) => {
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

module.exports = getAll;