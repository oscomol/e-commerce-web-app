const express = require('express');
const router = express.Router();
const auth = require("../controllers/authController")

router.route('/login')
    .post(auth.login)

router.route('/refresh')
    .get(auth.refresh)

router.route('/logout')
    .post(auth.logout)

module.exports = router;