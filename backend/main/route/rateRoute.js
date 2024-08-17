const express = require("express");
const router = express.Router();

const rate = require("../controllers/rateController");

router.route("/")
    .post(rate.createRate)

router.route("/getRate")
    .post(rate.getRate)

module.exports = router;