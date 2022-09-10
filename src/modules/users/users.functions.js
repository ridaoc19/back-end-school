const bcrypt = require("bcrypt");
const Students = require("../students/students.models");
const Users = require("./users.models");
const { uuid } = require('uuidv4');
const Email = require("../../core/constants/email");
const TypeUsers = require("../typeusers/typeusers.models");
const Notifications = require("../notifications/notifications.models");


module.exports = {
  async administrativo(body, res) {
    let temPass = uuid().split("-")[0];
    await Email(temPass, body.users.email);
    // console.log(temporaryPassword)
    // let password = bcrypt.hashSync(temPass, 10);
    Users.create({
      firstNames: body.users.firstNames,
      lastName: body.users.lastName,
      phone: body.users.phone,
      email: body.users.email,
      password: bcrypt.hashSync(temPass, 10),
      active: true,
      typeuserIdTypeUsers: body.users.typeuserIdTypeUsers,
    })
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  },

  async tutor(body, res) {
    try {
      const user = await body.users.map((element) => {
        let temPass = uuid().split("-")[0];
        // Email(temPass, body.users.email)
        let password = bcrypt.hashSync(temPass, 10);
        return {
          firstNames: element.firstNames,
          lastName: element.lastName,
          phone: element.phone,
          email: element.email,
          password: password,
          active: true,
          typeuserIdTypeUsers: element.typeuserIdTypeUsers,
        };
      });

      const users = await Users.bulkCreate(user);

      body.students.forEach((element) => {
        Students.create({
          firstNames: element.firstNames,
          lastName: element.lastName,
          dniStudent: element.dniStudent,
          birthDate: element.birthDate,
          active: true,
          courseIdCourse: element.courseIdCourse,
        }).then((student) => {
          student.addUser(users);
        });
      });

      return res.status(200).json(user);
    } catch (error) {
      return res.status(404).json(error);
    }
  },

  async preceptor(body, res) {
    let password = bcrypt.hashSync(body.users.password, 10);

    let create = await Users.create({
      firstNames: body.users.firstNames,
      lastName: body.users.lastName,
      phone: body.users.phone,
      email: body.users.email,
      password: password,
      active: true,
      typeuserIdTypeUsers: body.users.typeuserIdTypeUsers,
    })
      .then((user) => {
        user.setCourses(body.users.idCourse);
        res.status(200).json(user);
      })
      .catch((err) => {
        res.status(404).json(err);
      });

    return create;
  },

  async idUserInfo(req, res) {
    Users.findByPk(req.idUser, {
      include: [
        {
          model: TypeUsers,
        },
        {
          model: Students,
        },
        {
          model: Notifications,
        },
      ],
    })
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => res.status(400).json(err));
  },
};

