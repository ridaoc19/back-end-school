const Users = require("../../../modules/users/users.models.js")
const TypeUsers = require("../../../modules/typeUsers/typeUsers.models.js");
const Students = require("../../../modules/students/students.models.js");
const Course = require("../../../modules/course/course.models.js")
const Notifications = require("../../../modules/notifications/notifications.models.js");
const Payments = require("../../../modules/payments/payments.models.js");

const sequelize = require("../db.js");
const { DataTypes } = require("sequelize");


// UNO-MUCHOS -- typeUsers-users
// un tipo de usuario va a tener muchos usuarios
TypeUsers.hasMany(Users);
Users.belongsTo(TypeUsers);

// UNO-MUCHOS -- user-course
// preceptor USER tiene muchos cursos COURSE
Users.hasMany(Course);
Course.belongsTo(Users);

// UNO-MUCHOS -- course-students
// un CURSO a muchos ESTUDIANTES
Course.hasMany(Students);
Students.belongsTo(Course);

// MUCHOS-MUCHOS -- users-students
Students.belongsToMany(Users, {through: 'users_students'}) // belongs To Many
Users.belongsToMany(Students, {through: 'users_students'})  // belongs To Many


// // MUCHOS-MUCHOS -- notifications-users
const users_notifications = sequelize.define("users_notifications", {}, { timestamps: false });
Notifications.belongsToMany(Users, {through: users_notifications,  foreignKey: "notificationId" }) // belongs To Many
Users.belongsToMany(Notifications, {through: users_notifications, foreignKey: "addresseeId" }) // belongs To Many

// UNO-MUCHOS -- users-students
Users.hasMany(Notifications, {   foreignKey: 'senderId' });
Notifications.belongsTo(Users, {as: "sender",foreignKey: 'senderId' });


Payments.belongsToMany(Users, {through: 'users_payments'}) // belongs To Many
Users.belongsToMany(Payments, {through: 'users_payments'}) // belongs To Many
/*

e
*/


// // MUCHOS-MUCHOS -- notifications-users
// const users_notifications = sequelize.define("users_notifications", {
//     // senderId: DataTypes.FLOAT
// }, { timestamps: false });
// Notifications.belongsToMany(Users, {through: users_notifications,  foreignKey: "notificationId" }) // belongs To Many
// // Notifications.belongsToMany(Users, {through: users_notifications,  as: "addressee" , foreignKey: "notificationId" }) // belongs To Many
// Users.belongsToMany(Notifications, {through: users_notifications, foreignKey: "addresseeId" }) // belongs To Many

// // , { foreignKey: 'senderId' }
// Users.hasMany(users_notifications, { foreignKey: 'senderId' });
// users_notifications.belongsTo(Users, {foreignKey: 'senderId' });
// // users_notifications.belongsTo(Users, {as: "sender", foreignKey: 'senderId' });