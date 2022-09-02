const Users = require("../users/users.models");
const Students = require("./students.models");

module.exports = {
  // CREAR USUARIO
  async createUser(req, res, next) {
    let { firstNames, lastName, dniStudent, birthDate } = req.body;

    try {
      let createStudents = await Students.create({
        firstNames,
        lastName,
        dniStudent,
        birthDate,
      });

      createStudents.addUser(req.body.users)

      res.status(200).json(createStudents);

    } catch (error) {
      res.status(404).json({ error: error.messages });
      next();
    }
  },

  // LLAMA TODO INCLUYENDO TIPO DE USUARIO
  async getAll(req, res) {
    try {
      const getall = await Students.findAll({ include: Users });

      res.status(200).json(getall);
    } catch (error) {
      res.status(403).send({ error: error.message });
    }
  },

  // AL CONTRARIO
  async getOTRO(req, res) {
    try {
      const getall = await Users.findAll({ include: Students });

      res.status(200).json(getall);
    } catch (error) {
      res.status(403).send({ error: error.message });
    }
  },
};
