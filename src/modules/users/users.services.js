const {
  POST_TUTOR,
  POST_ADMINISTRATIVO,
  POST_PRECEPTOR,
  POST_SUPERVISOR,
} = require("../../core/constants/constants.js");
const bcrypt = require("bcrypt");
const TypeUsers = require("../typeUsers/typeUsers.models");
const Users = require("./users.models");
const { tutor, preceptor, administrativo, idUserInfo, resPassword } = require("./users.functions.js");
const Students = require("../students/students.models.js");
const Course = require("../course/course.models.js");

//tutor json
// const TUTOR = require("../users/users.json.js")

module.exports = {
  // Crea Usuarios
  async createUser(req, res) {
    switch (req.body.type) {
      case POST_TUTOR:
        let replyTutors = await tutor(req.body, res);
        return replyTutors;
      case POST_ADMINISTRATIVO:
        let replyAdmin = await administrativo(req.body, res);
        return replyAdmin;
      case POST_PRECEPTOR:
        let replyPreceptor = await preceptor(req.body, res);
        return replyPreceptor;
      case POST_SUPERVISOR:
        let replySupervisor = await administrativo(req.body, res);
        return replySupervisor;
      default:
        res.json({ error: "error in sending the type" });
    }
  },

  // LLAMA TODO INCLUYENDO TIPO DE USUARIO, ESTUDIANTE, CURSOS
  async getAll(req, res) {
    try {
      const getall = await Users.findAll({
        include: [
          {
            model: TypeUsers,
          },
          {
            model: Students,
            attributes: [
              "idStudent",
              "firstNames",
              "lastName",
              "dniStudent",
              "birthDate",
            ],
            through: { attributes: [] },
            include: [
              {
                model: Course,
              },
            ],
          },
          { model: Course },
        ],
        attributes: ["idUser", "firstNames", "lastName", "phone", "email"],
      });

      res.status(200).json(getall);
    } catch (error) {
      res.status(403).send({ error: error.message });
    }
  },

  async putUser(req, res) {
    console.log(req.body)
    try {
      let put = await Users.update(
        {
          firstNames: req.body.firstNames,
          lastName: req.body.lastName,
          phone: req.body.phone,
          email: req.body.email,
           
          typeuserIdTypeUsers: req.body.TypeUsers,
          },
        {
          where: {
            idUser: req.body.idUser,
          },
        }
      );

      res.status(200).json(put);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  async deleteUser(req, res) {
    let { idUser } = req.params;
    try {
      let search = await Users.findByPk(idUser);

      if (search.active) {
        search = "false",
        await Users.update({ active: false },{ where: { idUser: idUser } }
        );
      } else {
        search = "true",
        await Users.update({ active: true },{ where: { idUser: idUser } });
      }
      res.status(200).json(search);
      
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  async getPassword(req, res) {

    Users.findOne({
      where: {
        email: req.body.email,
      }
    }).then(async (user) => {
      switch (req.body.type) {
        case "GOOGLE":
          if(!user) return res.status(200).json({ msg: "Usuario no esta registrado, comniquese con la escuela" });
          idUserInfo(user.idUser, res, "GOOGLE" )
          break;
        case "LOCAL":
          if(!user) return res.status(200).json({ msg: "Usuario ó Contraseña incorrecta" });
          const match = await bcrypt.compare(req.body.password, user.password);
          if (!match) return res.status(200).json({ msg: "Usuario ó Contraseña incorrecta" });
          idUserInfo(user.idUser, res, "LOCAL" )
          break;
      };

    });
  },

  async resetPassword(req, res) {
    resPassword(req, res)
  },




};
