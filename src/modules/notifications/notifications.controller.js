const express = require('express');
const router = express.Router();
const { createNotification, getAllNotification ,putNotification, putNotificationStudent, putNotificationActDes, putNotificationCheck, putNotificationScore, getNotificationsIdUser} = require('./notifications.services.js');

router.post("/", createNotification )
router.put("/", putNotification )
router.put("/notificationStudent/:idNotificationStudent", putNotificationStudent )
router.put("/ActDes/", putNotificationActDes )
router.put("/check/:idNotificationStudent", putNotificationCheck )
router.put("/score/", putNotificationScore )
router.get("/", getAllNotification )
router.get("/idUser/:idUser", getNotificationsIdUser )


module.exports = router;