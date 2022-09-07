<<<<<<< HEAD
=======
const bcrypt = require("bcrypt");
>>>>>>> develop
const Students = require("../students/students.models");
const Users = require("./users.models");

module.exports = {

  async administrativo(body) {

    const users = await Users.bulkCreate(body.users);
    let password = bcrypt.hashSync(body.users.password, 10);
    let users = Users.create({
      firstNames: body.users.firstNames,
      lastName: body.users.lastName,
      phone: body.users.phone,
      email: body.users.email,
      password: password,
      typeuserIdTypeUsers: body.users.typeuserIdTypeUsers,
    })
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        res.status(404).json(err);
      });

    return users;
  },


  async tutor(body) {

<<<<<<< HEAD
    const users = await Users.bulkCreate(body.users);
=======
    const user = await body.users.map((element) => {
      let password = bcrypt.hashSync(element.password, 10);
      return {
        firstNames: element.firstNames,
        lastName: element.lastName,
        phone: element.phone,
        email: element.email,
        password: password,
        typeuserIdTypeUsers: element.typeuserIdTypeUsers,
      };
    });

    const users = await Users.bulkCreate(user);
>>>>>>> develop

    body.students.forEach((element) => {
      Students.create({
        firstNames: element.firstNames,
        lastName: element.lastName,
        dniStudent: element.dniStudent,
        birthDate: element.birthDate,
        courseIdCourse: element.courseIdCourse,
      }).then((student) => {
        student.addUser(users);
      });
    });

    return users;
  },
  

  async preceptor(body) {

<<<<<<< HEAD
=======
    let password = bcrypt.hashSync(body.users.password, 10);

>>>>>>> develop
    let create = await Users.create({
      firstNames: body.users.firstNames,
      lastName: body.users.lastName,
      phone: body.users.phone,
      email: body.users.email,
<<<<<<< HEAD
      password: body.users.password,
      typeuserIdTypeUsers: body.users.typeuserIdTypeUsers,
    })
      .then(user => {
        user.setCourses(body.users.idCourse);//////
        return {user_created: user}
      })
      .catch((err) => {
        return {err: err.message};
      });

      return create;
  },


=======
      password: password,
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

>>>>>>> develop
};

