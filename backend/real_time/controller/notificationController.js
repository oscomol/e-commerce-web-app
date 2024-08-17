const dbcon = require('../config/dbcon');

const getNotif = (recieverID) => {
    const sqlQuery = "SELECT * FROM tbl_notification WHERE recieverID = ?";
    return new Promise((resolve, reject) => {
        dbcon.query(sqlQuery, [recieverID], (err, result) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            resolve(result);
        });
    });
}

const addNotif = async (data, admins, io, access) => {
    const sqlQuery = "INSERT INTO tbl_notification (recieverID, date, time, notification, notifType, isOpen, notifID) VALUES(?,?,?,?,?,?,?)";
    
    dbcon.query(sqlQuery, [access, new Date().toLocaleDateString(), new Date().toLocaleTimeString(), data.notification, access === "0" ? 5:1, false, data.trackingID], async (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        if (admins?.length > 0) {
            try {
                const adminNotif = await getNotif(access);
                for (let x = 0; x < admins.length; x++) {
                    const admin = admins[x];
                    io.to(admin.socketID).emit('notifRes', adminNotif)
                }
            } catch (error) {
                console.log('Error fetching notifications:', error);
            }
        }
    });
}

module.exports = {
    addNotif,
    getNotif
}
