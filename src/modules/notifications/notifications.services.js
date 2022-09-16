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
      active: req.body.active,
      check: req.body.check,//habilita la confirmacion de ser necesario
      pay: req.body.pay,//habilita boton de pago de ser necesario
      review: req.body.review, //puntaje para la notificacion si lo requiere
      senderId: req.body.senderId, //sender emisor el q envia
    }).then(async (notification) => {
      // Agrega a tabla intermedia los estudiantes a los que esta dirigida
       await notification.setStudents(req.body.studentId) 
         
       res.status(200).json("se guardo");

      }).catch((err) => res.status(400).json({ error: err.message }));
  },
  async putNotification(req, res) {
    console.log("Notificacion a editar",req.body)
    try {
      let put = await Notifications.update(
        {
          subject: req.body.subject,
          body: req.body.body,
          creationDate: req.body.createDate,
          active: req.body.active,
          check: req.body.check,//habilita la confirmacion de ser necesario
          pay: req.body.pay,//habilita boton de pago de ser necesario
          review: req.body.review, //puntaje para la notificacion si lo requiere
          senderId: req.body.senderId, //sender emisor el q envia
        },
        {
          where: {
            idNotifications: req.body.idNotifications,
          },
        }
      );

      res.status(200).json(put);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
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
