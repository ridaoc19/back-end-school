const sequelize = require("./src/core/database/db.js");
const Course = require("./src/modules/course/course.models.js");
const Students = require("./src/modules/students/students.models.js");
const TypeUsers = require("./src/modules/typeUsers/typeUsers.models.js");
const Users = require("./src/modules/users/users.models.js");
require("./src/core/database/relations/associations.js");

let POST_TUTOR = {
  users: [
    {
      firstNames: "Anton",
      lastName: "apeAnto",
      phone: "3245435435",
      email: "azr@azr.es",
      password: "123dfg",
      typeuserIdTypeUsers: "3",
    },
    {
      firstNames: "Pepe",
      lastName: "apePepe",
      phone: "87686858",
      email: "pepe@gmail.com",
      password: "123dfg",
      typeuserIdTypeUsers: "3",
    },
    {
      firstNames: "Lucia",
      lastName: "apeLuia",
      phone: "45342009624",
      email: "lucia@hotmail.com",
      password: "123dfg",
      typeuserIdTypeUsers: "3",
    },
  ],
  students: [
    {
      firstNames: "maximiliano",
      lastName: "david",
      dniStudent: "33464646",
      birthDate: "12-02-1990",
      active: false,
      courseIdCourse: "2",
    },
    {
      firstNames: "juan",
      lastName: "ocampo",
      dniStudent: "54665",
      birthDate: "12-02-1990",
      active: false,
      courseIdCourse: "1",
    },
  ],
};

let POST_ADMINISTRATIVO = {
  users: [
    {
      firstNames: "Glenna",
      lastName: "Reichert",
      phone: "76495",
      email: "Chaim_McDermott@dana.io",
      password: "123dfg",
      typeuserIdTypeUsers: "1",
    },
  ],
};

let POST_SUPERVISOR = {
  users: [
    {
      firstNames: "Leanne",
      lastName: "Graham",
      phone: "2998",
      email: "incere@april.biz",
      password: "14dfg",
      typeuserIdTypeUsers: "4",
    },
  ],
};

let POST_PRECEPTOR = {
  users: {
    firstNames: "Clementina",
    lastName: "DuBuque",
    phone: "31428",
    email: "Rey.Padberg@karina.biz",
    password: "123dfg",
    typeuserIdTypeUsers: "2",
    idCourse: ["1", "5"],
  },
};

// tipo de usuario
const typeUsers = [
  { typeUsers: "Administrativo" },
  { typeUsers: "Preceptor" },
  { typeUsers: "Tutor" },
  { typeUsers: "Supervisor" },
];

// cursos
const courses = [
  { nameCourse: "1°-A" },
  { nameCourse: "1°-B" },
  { nameCourse: "2°-A" },
  { nameCourse: "2°-B" },
  { nameCourse: "3°-A" },
  { nameCourse: "3°-B" },
  { nameCourse: "4°-A" },
  { nameCourse: "4°-B" },
  { nameCourse: "5°-A" },
  { nameCourse: "5°-B" },
  { nameCourse: "6°-A" },
  { nameCourse: "6°-B" },
];

sequelize
  .sync({ force: false })
  .then(() => {
    // Conexión establecida
    console.log("Conexión establecida...");
  })
  .then(async () => {
    // Rellenar tipo de usuario
    await TypeUsers.bulkCreate(typeUsers);
  })
  .then(async () => {
    // Rellenar cursos
    await Course.bulkCreate(courses);
  })
  .then(async () => {
    // Rellenar usuarios
    const users = await Users.bulkCreate(POST_TUTOR.users);

    POST_TUTOR.students.forEach((element) => {
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
  })
  .then(async () => {
    await Users.bulkCreate(POST_ADMINISTRATIVO.users);
  })
  .then(async () => {
    await Users.bulkCreate(POST_SUPERVISOR.users);
  })
  .then(async () => {
    await Users.create({
      firstNames: POST_PRECEPTOR.users.firstNames,
      lastName: POST_PRECEPTOR.users.lastName,
      phone: POST_PRECEPTOR.users.phone,
      email: POST_PRECEPTOR.users.email,
      password: POST_PRECEPTOR.users.password,
      typeuserIdTypeUsers: POST_PRECEPTOR.users.typeuserIdTypeUsers,
    }).then((user) => {
      user.setCourses(POST_PRECEPTOR.users.idCourse);
    });
  });
