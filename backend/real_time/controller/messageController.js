const dbcon = require("../config/dbcon");

const getMessageById = async (id, role) => {
    let messageQuery = "SELECT * FROM tbl_mesage WHERE access LIKE ?";
    let dataQ = id + '%';
    if (role === 1) {
        messageQuery = "SELECT * FROM tbl_mesage WHERE access LIKE ?";
        dataQ = '%A';
    }

    return new Promise((resolve, reject) => {
        dbcon.query(messageQuery, [dataQ], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

const createMessage = async (data, io, users) => {

    const dateToday = new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' });
    let messageQuery = "INSERT INTO tbl_mesage (message, dateTime, sender, isSeen, access, role) VALUES (?,?,?,?,?,?)";
    let dataQuery = [data.message, dateToday, data.sender, 0, data.access, data.role];

    if (data?.reciever) {
        messageQuery = "INSERT INTO tbl_mesage (message, dateTime, sender, reciever, isSeen, access) VALUES (?,?,?,?,?,?)";
        dataQuery = [data.message, dateToday, data.sender, data.reciever, 0, data.access];
    }

    dbcon.query(messageQuery, dataQuery, async (err, result) => {
        if (err) {
            console.log(err);
        }

        const user = users.find(list => list.id === data.sender);
        const admin = users.filter(list => list.role == 1);

        if (user) {
            const userRes = await getMessageById(data.sender, 2);
            const socketID = user.socketID;
            io.to(socketID).emit('recieveMessage', userRes);
        }

        if (admin?.length) {
            const adminRes = await getMessageById('', 1);
            for (let x = 0; x < admin.length; x++) {
                const socketID = admin[x].socketID;
                io.to(socketID).emit('recieveMessage', adminRes);
            }
        }
    })
}

const adminDeleteMessage = async (data, io, users) => {
    const {reciever, id, access} = data;
    let sqlQuery = '';
    let sqlData = [];

    if(access){
        sqlQuery = "UPDATE tbl_mesage SET access = ? WHERE id=?"
        sqlData.push(reciever)
    }else{
        sqlQuery = "DELETE FROM tbl_mesage WHERE id = ?"
    }
   
    await dbcon.query(sqlQuery, [...sqlData, id], async (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        const admin = users.filter(list => list.role == 1);

        if (admin?.length) {
            const adminRes = await getMessageById('', 1);
            for (let x = 0; x < admin.length; x++) {
                const socketID = admin[x].socketID;
                io.to(socketID).emit('recieveMessage', adminRes);
            }
        }
    })
}

const deleteMessage = async (data, io, users) => {
    const { access, id, sender } = data;
    let deleteQuery = '';
    let dataQuery = [];
    if(access){
        deleteQuery = "UPDATE tbl_mesage SET access = ? WHERE id=?";
        dataQuery.push(access);
    }else{
        deleteQuery = "DELETE FROM tbl_mesage WHERE id = ?";
    }
    dbcon.query(deleteQuery, [...dataQuery, id], async (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        const res = await getMessageById(sender);
        if (res) {
            const user = users.find(list => list.id === sender);
            io.to(user.socketID).emit('recieveMessage', res)
        }
    })
}

module.exports = {
    createMessage,
    getMessageById,
    deleteMessage,
    adminDeleteMessage
}