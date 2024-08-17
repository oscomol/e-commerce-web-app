const dbConn = require("../config/dbcon");
const trackingID = require("../middleware/randomString")


const getProduct = async (orderID, sqlQueryForGettingPro) => {
    return new Promise((resolve, reject) => {
        dbConn.query(sqlQueryForGettingPro, [orderID], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

const getAllOrder = async () => {
    try {
        const sqlQuery = `SELECT * FROM tbl_order`;
        const sqlQueryForGettingPro = `SELECT * FROM tbl_productordered WHERE orderID = ?`;

        const result = await new Promise((resolve, reject) => {
            dbConn.query(sqlQuery, async (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    const orderData = [];
                    for (const order of result) {
                        const orderID = order.id;
                        const products = await getProduct(orderID, sqlQueryForGettingPro);
                        orderData.push({ ...order, products });
                    }
                    resolve(orderData);
                }
            });
        });
        return result;
    } catch (err) {
        console.error("Error fetching orders:", err);
        throw err;
    }
};

const getOrderById = async (id) => {
    try {
        const sqlQuery = `SELECT * FROM tbl_order WHERE userID = ?`;
        const sqlQueryForGettingPro = `SELECT * FROM tbl_productordered WHERE orderID = ?`;

        const result = await new Promise((resolve, reject) => {
            dbConn.query(sqlQuery, [id], async (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    const orderData = [];
                    for (const order of result) {
                        const orderID = order.id;
                        const products = await getProduct(orderID, sqlQueryForGettingPro);
                        orderData.push({ ...order, products });
                    }
                    resolve(orderData);
                }
            });
        });
        return result;
    } catch (err) {
        console.error("Error fetching orders:", err);
        throw err;
    }
}

const handleQuantity = async (data, dec, io, users) => {
    console.log({data, dec, users})
   const {productID, quantity} = data;
   const getSql = "SELECT * FROM tbl_products WHERE id = ?";
   dbConn.query(getSql, [productID], (err, result) => {
    if(err) console.log(err);
    const stock = dec ? result[0].stock - quantity:result[0].stock + quantity;
    const updateSql = "UPDATE tbl_products SET stock = ? WHERE id = ?";
    dbConn.query(updateSql, [stock, productID], (err, result) => {
        if(err) console.log(err);
        dbConn.query('SELECT * FROM tbl_products',  (err, result) => {
            if(err) return;
            if(users?.length){
                for(let x=0; x<users.length; x++){
                    io.emit('getProduct', result);
                }
            }
        })
       })
   })
}

const newOrder = async (io, data, users) => {
    const dateToday = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Manila' });
    const sqlQuery = "INSERT INTO tbl_order (userID, dateOrdered, status, shippingFee, trackingID, shippingMethod) VALUE(?,?,?,?,?,?)";
    const queryData = [data.userID, dateToday, data.status, data.shippingFee, trackingID() + data.userID, data.shippingMethod];

    try {
        dbConn.query(sqlQuery, queryData, async (err, result) => {
            if (err) {
                console.log(err);
            } else {
                const orderID = result.insertId;
                const sqlQuery = "INSERT INTO tbl_productordered (orderID, quantity, productID, price) VALUES(?,?,?,?)";
                const promises = []; 
                for (let x = 0; x < data.productIDs?.length; x++) {
                    const product = data.productIDs[x];
                    handleQuantity(product, true, io, users)
                    promises.push(new Promise((resolve, reject) => {
                        dbConn.query(sqlQuery, [orderID, data.productIDs[x].quantity, data.productIDs[x].productID, data.productIDs[x].price], (err, result) => {
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
                const admins = users.filter(user => user.role === 1);
                const sender = users.find(user => user.id === data.userID);
                if(sender){
                    const userRes = await getOrderById(data.userID);
                    io.to(sender?.socketID).emit('orderRes', userRes)
                }
                if(admins?.length){
                    const result = await getAllOrder();
                    for(let x=0; x<admins.length; x++){
                      const admin = admins[x];
                      io.to(admin.socketID).emit('orderRes', result)
                    }
                   }
            }
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getAllOrder,
    getOrderById,
    newOrder,
    handleQuantity
};
