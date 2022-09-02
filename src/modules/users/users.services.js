const TypeUsers = require("../typeUsers/typeUsers.models");
const Users = require("./users.models");

module.exports = {
  // CREAR USUARIO RELACIONADO CON TIPO DE USUARIO
  async createUser(req, res) {
    try {
      const registro = await TypeUsers.findByPk(req.body.TypeUserIdTypeUsers);
      if (!registro) throw new Error("no esta");
      let users = await Users.create(req.body);
      res.status(200).json(users);
    } catch (error) {
      res.status(403).send({ error: error.message });
    }
  },

  // LLAMA TODO INCLUYENDO TIPO DE USUARIO
  async getAll(req, res) {
    try {
      const getall = await Users.findAll({ include: TypeUsers });
      res.status(200).json(getall);
    } catch (error) {
      res.status(403).send({ error: error.message });
    }
  },

  // AL CONTRARIO
  async getOTRO(req, res) {
    try {
      const getall = await TypeUsers.findAll({ include: Users });
      res.status(200).json(getall);
    } catch (error) {
      res.status(403).send({ error: error.message });
    }
  },
};
