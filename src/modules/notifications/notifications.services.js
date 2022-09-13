const Students = require("../students/students.models");
const Users = require("../users/users.models");
const Notifications = require("./notifications.models");
const TypeUsers = require("../typeUsers/typeUsers.models");
const notifications_students_user = require("../../core/database/relations/associations.js");

module.exports = {
  // Crea Notificacion
  async createNotification(req, res) {
    console.log(req.body)
    Notifications.create({
      subject: req.body.subject,
      body: req.body.body,
      creationDate: Date.now(),
      /*
      active: true,
      archived: false,
      favorite: false,
      check: false,
      replyedFrom: req.body.replyedFrom //respuesta de
      */
      senderId: req.body.senderId, //sender emisor el q envia
    }).then(async (notification) => {
      // console.log(notification)
       let resultUser = await notification.setUsers(req.body.addresseeId) //addresee destinatario
       let resultStudents = await notification.setStudents(req.body.studentId) 
         
       res.status(200).json("se guardo");

      }).catch((err) => res.status(400).json({ error: err.message }));
  },

  async getAllNotification(req, res) {
    try {
      let addressee = await Notifications.findAll({

        include: [
          { model: Users, as: "sender", include: [{ model: TypeUsers }] },
          { model: Users, as: "addressee", include: [{ model: TypeUsers }] },
          { model: Students }
      ],
      });
      console.log(addressee)
      res.status(200).json([addressee]);
    } catch (error) {
      res.status(400).json({ err: error.message });
    }
  },

};
