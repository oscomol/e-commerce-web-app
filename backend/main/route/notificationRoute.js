const express = require("express");
const router = express.Router();

const notification = require("../controllers/notificationController");

router.route("/")
    .post(notification.createNotification)
    .delete(notification.deleteNotification)
    .put(notification.seenNotif)

router.route("/:recieverID")
    .get(notification.getNotificationById)

module.exports = router;