const Students = require("../students/students.models");
const Users = require("../users/users.models");
const Notifications = require("./notifications.models");
const { notifications_students } = require("../../core/database/relations/associations")
const TypeUsers = require("../typeUsers/typeUsers.models");
const Course = require("../course/course.models")

module.exports = {

  async getAllNotification(req, res) {
    try {
      let notificacionAll = await Notifications.findAll({

        include: [
          { model: Users, as: "sender", include: [{ model: TypeUsers }] },
          { model: Students, include: { model: Course } }
        ],
      });
      res.status(200).json(notificacionAll);
    } catch (error) {
      res.status(400).json({ err: error.message });
    }
  },
  // Crea Notificacion
  async createNotification(req, res) {
    try {
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

        res.status(200).json("Se creo correctamente ", req.body);

      })
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  async putNotification(req, res) {
    console.log("Notificacion a editar", req.body)
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

  async putNotificationStudent(req, res) {

    console.log("idNotificationStudent a editar", req.params)
    let idNotificationStudent = req.params.idNotificationStudent
    try {
      let put = await notifications_students.update(
        {
          checkState: req.body.checkState ? req.body.checkState : false,
          score: req.body.score ? req.body.score : 0,
          comments: req.body.comments ? req.body.comments : null,
        },
        {
          where: {
            idNotificationStudent: idNotificationStudent,
          },
        }
      );

      res.status(200).json(put);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  async putNotificationActDes(req, res) {
    console.log("Campo a editaren notificacion", req.body)
    try {
      let put = await Notifications.update(
        {
          active: req.body.active,
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

  async putNotificationScore(req, res) {
    try {
      let put = await notifications_students.update(
        {
          score: req.body.score,
        },
        {
          where: {
            idNotificationStudent: req.body.idNotificationStudent,
          },
        }
      );

      res.status(200).json(put);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  async putNotificationCheck(req, res) {
    try {
      if (req.params.idNotificationStudent) {
        let put = await notifications_students.update(
          {
            checkState: true,
          },
          {
            where: {
              idNotificationStudent: req.params.idNotificationStudent,
            },
          }
        );

        res.status(200).json(put);
      }
      else {
        res.status(402).json("No se recibe idNotificationStudent");

      }
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  async getNotificationsIdUser(req, res) {
    let idUser = req.params.idUser
    try {
      Users.findByPk(idUser, {
        include: [
          { model: Students, include: [{ model: Notifications }] },
        ],
      })
        .then((user) => {
          res.status(200).json(user);
        })
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },
}
