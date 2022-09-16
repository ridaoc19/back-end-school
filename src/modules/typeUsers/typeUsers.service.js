const TypeUsers = require("../typeUsers/typeUsers.models");


module.exports = {
   async getAllTypeUsers(req, res) {
    let typeUsers = await TypeUsers.findAll()

     Promise.all(typeUsers).then(values => {
      res.status(200).json(values)
    }).catch(err => res.status(400).json({ err: err.message }))
  },

}
