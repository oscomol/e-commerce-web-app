require('dotenv').config();
const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const PORT = process.env.port || 3500;

const errorHandler = require("./middleware/errorHandler");
const corsOption = require('./config/corsOption');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(cors(corsOption));
app.use(cookieParser());
app.use(express.static('public'));

app.use('/user', require('./route/usersRoute'));
app.use('/address', require('./route/addressRoute'));
app.use('/product', require('./route/productRoute'));
app.use('/wishlist', require('./route/wishlistRoute'));
app.use('/order', require('./route/orderRoute'));
app.use('/logs', require('./route/logsRoute'));
app.use('/notification', require('./route/notificationRoute'));
app.use('/auth', require('./route/authRoute'));
app.use('/rate', require('./route/rateRoute'));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at PORT ${PORT}`);
});