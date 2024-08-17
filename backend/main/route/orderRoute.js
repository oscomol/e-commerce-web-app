const express = require("express");
const router = express.Router();

const order = require("../controllers/orderController");

router.route("/:userID")
    .get(order.getOrderByID)

router.route("/")
    .get(order.getAllOrder)
    .post(order.createOrder)
    .put(order.updateOrder)
    .delete(order.deleteOrder)

module.exports = router;