const express = require("express");
const router = express.Router();

const message = require("../controllers/messageController");

const verifyJwt = require('../middleware/verifyJWT');

// router.use(verifyJwt);

router.route("/")
    .delete(message.deleteMessage)
    .post(message.seenMessage)

module.exports = router;