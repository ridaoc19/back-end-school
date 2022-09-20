const Notifications = require("../notifications/notifications.models");
const Students = require("./students.models");
const Course = require("../course/course.models")

module.exports = {

  async getAllStudents(req, res) {
    try {
      let allStudents = await Students.findAll(
        {
          include: {
            model: Course
          }
        }
      );
      res.status(200).json(allStudents);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getAllStudentsIdNotification(req, res) {
    let idNotifications = req.params.IdNotifications
    console.log("params recibido en idnot",idNotifications);
    try {
      let allStudents = await Notifications.findByPk(idNotifications, {
        include: {
          model: Students,
        }
      });
      res.status(200).json(allStudents.students);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async putStudent(req, res) {
    try {
      let put = await Students.update(
        {
          firstNames: req.body.firstNames,
          lastName: req.body.lastName,
          dniStudent: req.body.dniStudent,
          birthDate: req.body.birthDate,
          courseIdCourse: req.body.courseIdCourse,
        },
        {
          where: {
            idStudent: req.body.idStudent,
          },
        }
      );

      res.status(200).json(put);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  async putStudentActDes(req, res) {
    try {
      let put = await Students.update(
        {
          active: req.body.active,
        },
        {
          where: {
            idStudent: req.body.idStudent,
          },
        }
      );

      res.status(200).json(put);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  async deleteStudent(req, res) {
    let { idStudent } = req.body;
    try {
      let search = await Students.findByPk(idStudent);

      if (search.active) {
        // search = "false",
        await Students.update({ active: false }, { where: { idStudent: idStudent } }
        );
      } else {
        // search = "true",
        await Students.update({ active: true }, { where: { idStudent: idStudent } });
      }
      res.status(200).json(search);

    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

};
