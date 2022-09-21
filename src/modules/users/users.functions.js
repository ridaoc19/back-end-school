const bcrypt = require("bcrypt");
const Students = require("../students/students.models");
const Users = require("./users.models");
const { uuid } = require("uuidv4");
const Email = require("../../core/constants/email");
const TypeUsers = require("../typeusers/typeusers.models");
const Notifications = require("../notifications/notifications.models");
const {
  notifications_users,
} = require("../../core/database/relations/associations.js");

module.exports = {
  async administrativo(body, res) {
    let temPass = uuid().split("-")[0];
    await Email(temPass, body.users.email);

    Users.create({
      firstNames: body.users.firstNames,
      lastName: body.users.lastName,
      phone: body.users.phone,
      email: body.users.email,
      password: bcrypt.hashSync(temPass, 10),
      active: true,
      initialState: true,
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

      let paraEmail = [];

      const user = await body.users.map((element) => {
        let temPass = uuid().split("-")[0];
        let password = bcrypt.hashSync(temPass, 10);

        paraEmail.push({password: temPass, email: element.email})

        return {
          firstNames: element.firstNames,
          lastName: element.lastName,
          phone: element.phone,
          email: element.email,
          password: password,
          active: true,
          initialState: true,
          typeuserIdTypeUsers: element.typeuserIdTypeUsers,
        };
      });

      paraEmail.forEach( async (element) => {
        await Email(element.password, element.email);
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
    let temPass = uuid().split("-")[0];
    await Email(temPass, body.users.email);

    let create = await Users.create({
      firstNames: body.users.firstNames,
      lastName: body.users.lastName,
      phone: body.users.phone,
      email: body.users.email,
      password: bcrypt.hashSync(temPass, 10),
      active: true,
      initialState: true,
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

  // RESTABLECER CONTRASEÑA
  async resPassword(req, res) {
    const { email, password, idUser,type } = req.body;

    switch (type) {
      case "RESET":
        try {

          let response = await Users.findOne({ where: { email: email } })

          if (!response) return res.status(200).json({ message: "Usuario no esta registrado, comunicarse con el colegio" })
          
          let temPass = uuid().split("-")[0];
          await Email(temPass, response.email);

          await Users.update({ password: bcrypt.hashSync(temPass, 10), initialState: true }, { where: { idUser: response.idUser } })

          res.status(200).json({ message: `Se envio la nueva contrase al correo electronico ${response.email}` })

        } catch (error) {
          res.status(404).json({ err: error.message });
        }
        
        break;

        case "CHANGE":
        
          Users.update({ password: bcrypt.hashSync(password, 10), initialState: false }, { where: { idUser: idUser } })
          .then((password) => res.status(200).json(password))
          .catch((error) => res.status(404).json({err: error.message}));

          break;

          default:
        return res.status(404).json("verifique")
    }
   
  },

  async idUserInfo(idUser, res, type) {
    
    Users.findByPk(idUser, {
      include: [
        { model: TypeUsers },
        { model: Students, include: [{ model: Notifications }] },
        { model: Notifications },
      ],
    })
      .then((user) => {
        res.status(200).json([user, type]);
      })
      .catch((err) => res.status(400).json(err));
  },
};
