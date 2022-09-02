const Users = require("../../../modules/users/users.models.js")
const TypeUsers = require("../../../modules/typeUsers/typeUsers.models.js");
const Students = require("../../../modules/students/students.models.js");

// UNO-MUCHOS -- typeUsers-users
// un tipo de usuario va a tener muchos usuarios
TypeUsers.hasMany(Users);
Users.belongsTo(TypeUsers);


// MUCHOS-MUCHOS -- users-students
Students.belongsToMany(Users, {through: 'UserStudents'}) // belongs To Many
Users.belongsToMany(Students, {through: 'UserStudents'})  // belongs To Many

