const express = require("express");
const router = express.Router();

const address = require("../controllers/addressController");

router.route("/")
    .post(address.createAddress)
    .put(address.updateAddress)
    .delete(address.deleteAddress)

module.exports = router;