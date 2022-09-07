const Students = require("../students/students.models");
const Users = require("../users/users.models");
const Notifications = require("./notifications.models");
const TypeUsers = require("../typeUsers/typeUsers.models");

module.exports = {
  // Crea Notificacion
  async createNotification(req, res) {
    Notifications.create({
      subject: req.body.subject,
      body: req.body.body,
      creationDate: Date.now(),
      active: false,
      senderId: req.body.senderId,
    })
      .then(async (notification) => {
        let relation = await notification.setUsers(req.body.addresseeId);
        res.status(200).json([notification, relation]);
      })
      .catch((err) => res.status(400).json({ error: err }));
  },

  async getAllNotification(req, res) {
    try {
      let addressee = await Notifications.findAll({
        include: [{ model: Users }],
      });
      res.status(200).json([addressee]);
    } catch (error) {
      res.status(400).json({ err: err.message });
    }
  },
};
