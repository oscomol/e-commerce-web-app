require('dotenv').config();
const http = require('http');
const { Server } = require("socket.io");
const PORT = process.env.PORT || 3600;
const order = require("./controller/orderController");
const dbcon = require("./config/dbcon");
const util = require('util');
const query = util.promisify(dbcon.query).bind(dbcon);

const { createMessage, adminDeleteMessage, getMessageById, deleteMessage } = require('./controller/messageController');
const { addNotif, getNotif } = require('./controller/notificationController');

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
});

let users = [];

const handleQuantityUpdate = async (data, io, users) => {
  const { id, status } = data;
  if (status === 1 || status === 3) {
    const getQuery = "SELECT tbl_productordered.productID, tbl_productordered.quantity FROM tbl_order INNER JOIN tbl_productordered ON tbl_order.id = tbl_productordered.orderID WHERE tbl_order.id=?";
    await dbcon.query(getQuery, [id], async (err, result) => {
      if (err) {
        console.log(err)
        return;
      }
      if (result?.length) {
        for (let x = 0; x < result.length; x++) {
          let dec = false;
          if (status === 1) {
            dec = true;
          } else if (status === 3) {
            dec = false;
          }
          await order.handleQuantity(result[x], dec, io, users)
        }
      }
    })
  }
}

io.on('connection', (socket) => {
  socket.on('user', async (data) => {
    const isUserExist = users.includes(data.socketID);
    if (!isUserExist) {
      users.push(data);
    }
    const orderRes = data.role === 1 ? await order.getAllOrder() : await order.getOrderById(data.id);
    const adminNotif = await getNotif(data.role === 1 ? '0':'all')
    io.to(data.socketID).emit('orderRes', orderRes);
    io.to(data.socketID).emit('notifRes', adminNotif)
    await dbcon.query('SELECT * FROM tbl_products', async (err, result) => {
      if (err) {
        console.log(err);
        return;
      }

      if (result?.length) {
        const sqlQuery = "SELECT * FROM tbl_ratings WHERE productID = ?";

        const wRatePromises = result.map(async (data) => {
          let newData = data;
          try {
            const ratings = await query(sqlQuery, [data.id]);
            if (ratings?.length > 0) {
              newData = { ...newData, rate: ratings.length > 0 ? ratings.map(rate => rate.rate).reduce((r1, r2) => r1 + r2) / ratings.length : ratings[0].rate };
            }
          } catch (err) {
            console.log(err);
          }
          return newData;
        });

        const wRate = await Promise.all(wRatePromises);
        io.to(data.socketID).emit('getProduct', wRate);
      }
    });

    const messages = await getMessageById(data.id, data.role);
    io.to(data.socketID).emit('recieveMessage', messages);
  })

  socket.on('newOrder', async (data) => {
    order.newOrder(io, data, users)
  })

  socket.on('newMessage', async (data) => {
    const dateToday = new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' });
    let messageQuery = "INSERT INTO tbl_mesage (message, dateTime, sender, isSeen, access, role) VALUES (?,?,?,?,?,?)";
    let dataQuery = [data.message, dateToday, data.sender, 0, data.access, data.role];

    if (data?.reciever && data?.orderID) {
      messageQuery = "INSERT INTO tbl_mesage (message, dateTime, sender, reciever, isSeen, access, role, orderID) VALUES (?,?,?,?,?,?,?,?)";
      dataQuery = [data.message, dateToday, data.sender, data.reciever, 0, data.access, data.role, data.orderID];
    } else if (data?.reciever && !data?.orderID) {
      messageQuery = "INSERT INTO tbl_mesage (message, dateTime, sender, reciever, isSeen, access, role) VALUES (?,?,?,?,?,?, ?)";
      dataQuery = [data.message, dateToday, data.sender, data.reciever, 0, data.access, data.role];
    } else if (data?.orderID && !data?.reciever) {
      messageQuery = "INSERT INTO tbl_mesage (message, dateTime, sender, isSeen, access, role, orderID) VALUES (?,?,?,?,?,?,?)";
      dataQuery = [data.message, dateToday, data.sender, 0, data.access, data.role, data.orderID];
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
  })

  socket.on('deleteMessage', async (data) => {
    deleteMessage(data, io, users)
  })

  socket.on('adminDeleteMessage', async (data) => {
    adminDeleteMessage(data, io, users);
  })

  socket.on('seenMessage', async (data) => {
    const sqlQuery = "UPDATE tbl_mesage SET isSeen = ? WHERE id = ?";
    data.forEach(id => {
      dbcon.query(sqlQuery, [1, id], (err, result) => {
        if (err) {
          console.log(err)
        }
      })
    })
  })

  socket.on('adminUpdateOrder', async (data) => {
    let sqlQuery = `UPDATE tbl_order SET status = ? WHERE id=?`;
    let dataArr = [data.status, data.id];
    if (data.status === 4) {
      const dateToday = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Manila' });
      sqlQuery = `UPDATE tbl_order SET status = ?, recievedDate = ? WHERE id=?`;
      dataArr = [data.status, dateToday, data.id];
    }
    if (data.status === 3) {
      console.log(data.products)
    }
    await dbcon.query(sqlQuery, dataArr, async (err, result) => {
      if (err) console.log(err);
      const admin = users.find(user => user.id === data.adminID);
      const user = users.find(user => user.id === data.userID);
      if (user) {
        const userData = await order.getOrderById(data.userID);
        io.to(user.socketID).emit('orderRes', userData)
      }
      if (admin) {
        const adminData = await order.getAllOrder();
        io.to(admin.socketID).emit('orderRes', adminData)
      }

      const logsQuery = "INSERT INTO tbl_logs (adminID, action, date, time) VALUES(?,?,?,?)";
      const { id, event } = data.logs;
      dbcon.query(logsQuery, [id, event, new Date().toLocaleDateString(), new Date().toLocaleTimeString()], (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
      });

      await handleQuantityUpdate(data, io, users);


    })
  })

  socket.on('newProductNotif', async (data) => {
    const admins = users.filter(user => user.role === 2);
    await dbcon.query('SELECT * FROM tbl_products', async (err, result) => {
      if (err) {
        console.log(err);
        return;
      }

      if (result?.length) {
        const sqlQuery = "SELECT * FROM tbl_ratings WHERE productID = ?";

        const wRatePromises = result.map(async (data) => {
          let newData = data;
          try {
            const ratings = await query(sqlQuery, [data.id]);
            if (ratings?.length > 0) {
              newData = { ...newData, rate: ratings.length > 0 ? ratings.map(rate => rate.rate).reduce((r1, r2) => r1 + r2) / ratings.length : ratings[0].rate };
            }
          } catch (err) {
            console.log(err);
          }
          return newData;
        });

        const wRate = await Promise.all(wRatePromises);
        io.emit('getProduct', wRate);
        await addNotif({ ...data, notification: `New product posted.` }, admins, io, 'all');
      }
    });
  });

  socket.on('openNotif', async (data) => {
    const sqlQuery = "UPDATE tbl_notification SET isOpen = ? WHERE id=?";
    await dbcon.query(sqlQuery, [1, data.id], (err, result) => {
        if(err){
            console.log(err)
            return;
        }
        
    })
  })

  socket.on('deleteNotif', async (data) => {
    const sqlQuery = "DELETE FROM tbl_notification WHERE id=?";
    await dbcon.query(sqlQuery, [data.id], (err, result) => {
        if(err){
            console.log(err)
            return;
        }
        
    })
  });

  socket.on('orderRated', async (data) => {
    const resultSender = await order.getOrderById(data.id);
    const sender = users.find(user => user.id === data.id);
    const admins = users.filter(user => user.role === 1);
    if (sender) {
      io.to(sender.socketID).emit('orderRes', resultSender)
    }
    await addNotif({ ...data, notification: `${data.username} rated an order: ${data.trackingID}` }, admins, io, '0');
  });

  socket.on('orderUpdate', async (data) => {
    const admins = users.filter(user => user.role === 1);
    const sqlQuery = `UPDATE tbl_order SET status = ? WHERE id=?`;
    await dbcon.query(sqlQuery, [data.status, data.id], async (err, result) => {
      if (err) console.log(err);
      const sender = users.find(user => user.id === data.userID);
      const resultSender = await order.getOrderById(data.userID);
      if (sender) {
        io.to(sender.socketID).emit('orderRes', resultSender)
      }
      if (admins?.length) {
        for (let x = 0; x < admins.length; x++) {
          const admin = admins[x];
          const result = await order.getAllOrder();
          io.to(admin.socketID).emit('orderRes', result)
        }
      }

      await handleQuantityUpdate(data, io, users);

    })
  });

  socket.on('disconnect', () => {
    const user = users.filter(user => user.socketID !== socket.id);
    users = user;
  });

});

server.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});
