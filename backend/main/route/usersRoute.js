const express = require("express");
const router = express.Router();

const user = require("../controllers/usersController");

router.route("/")
    .get(user.getUsers)
    .post(user.createUser)
    .put(user.updateUser)
    .delete(user.deleteUser)

router.route("/byID")
    .post(user.getUserByID)

router.route("/block")
    .put(user.handleBlocking)

module.exports = router;