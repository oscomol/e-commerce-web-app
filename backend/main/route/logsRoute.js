const express = require("express");
const router = express.Router();

const logs = require("../controllers/activityLogsController");

router.route("/")
    .get(logs.getAllLogs)
    .post(logs.createLogs)
    .delete(logs.deleteLogs)

module.exports = router;