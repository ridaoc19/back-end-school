<<<<<<< HEAD
const users_notifications = require("../../core/database/relations/associations");
=======
>>>>>>> develop
const Students = require("../students/students.models");
const Users = require("../users/users.models");
const Notifications = require("./notifications.models");
const TypeUsers = require("../typeUsers/typeUsers.models");

module.exports = {
  // Crea Notificacion
  async createNotification(req, res) {
<<<<<<< HEAD
    console.log(req.body)

=======
>>>>>>> develop
    Notifications.create({
      subject: req.body.subject,
      body: req.body.body,
      creationDate: Date.now(),
      active: false,
<<<<<<< HEAD
      senderId: req.body.senderId
    })
      .then(async (notification) => {
        let relation = await notification.setUsers(req.body.addresseeId);
        res.status(200).json( [notification, relation]);
=======
      senderId: req.body.senderId,
    })
      .then(async (notification) => {
        let relation = await notification.setUsers(req.body.addresseeId);
        res.status(200).json([notification, relation]);
>>>>>>> develop
      })
      .catch((err) => res.status(400).json({ error: err }));
  },

<<<<<<< HEAD
  

  async getAllNotification(req, res) {

    let addressee = await Notifications.findAll({
      include: [
        { model: Users, 
          through: {attributes: []},
          attributes: ["firstNames", "lastName"],
            include: [{ model: TypeUsers, attributes: ["typeUsers"] },
                      { model: Students},
                     
          ],
        },
        { model: Users, as:"sender" }
        
    ],
    attributes: ["subject", "body", "creationDate", "notificationDate", "active"]
    })

    // let sender = await  Notifications.findAll({
    //   include: [{model: Users, include: [{ model: TypeUsers}] }]
    // })

    // let sender = await  Notifications.findAll({
    //   include: [{model: Users, as: "addressee", },
    //    {model: users_notifications}
    //   // {model: Students}
        
    //     // include: [{model: Students}],
    //     // include: [{model: TypeUsers}]
    //   ]
    // })

    Promise.all([addressee]).then(values => {
      res.status(200).json(values)
    }).catch( err => res.status(400).json({err: err.message}))




  },




}
=======
  async getAllNotification(req, res) {
    try {
      let addressee = await Notifications.findAll({
        include: [{ model: Users }],
      });
      res.status(200).json([addressee]);
    } catch (error) {
      res.status(400).json({ err: err.message });
    }
  },
};
>>>>>>> develop
