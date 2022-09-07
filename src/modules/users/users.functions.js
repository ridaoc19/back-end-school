const Students = require("../students/students.models");
const Users = require("./users.models");

module.exports = {

  async administrativo(body) {

    const users = await Users.bulkCreate(body.users);

    return users;
  },


  async tutor(body) {

    const users = await Users.bulkCreate(body.users);

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

    let create = await Users.create({
      firstNames: body.users.firstNames,
      lastName: body.users.lastName,
      phone: body.users.phone,
      email: body.users.email,
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


};

