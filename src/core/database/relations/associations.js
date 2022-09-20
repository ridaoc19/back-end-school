const Users = require("../../../modules/users/users.models.js")
const TypeUsers = require("../../../modules/typeUsers/typeUsers.models.js");
const Students = require("../../../modules/students/students.models.js");
const Course = require("../../../modules/course/course.models.js")
const Notifications = require("../../../modules/notifications/notifications.models.js");
const Payments = require("../../../modules/payments/payments.models.js");
const News = require("../../../modules/news/news.models.js");
const FavNews = require("../../../modules/favNews/favNews.models.js");

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

///////////////////////////////NOTIFICACIONES ////////////////////////////////
// // MUCHOS-MUCHOS -- notifications-users
const notifications_users = sequelize.define("notifications_users", {}, { timestamps: false });
// Notifications.belongsToMany(Users, {through: notifications_users,  foreignKey: "notificationId" }) // belongs To Many
Notifications.belongsToMany(Users, {as: "addressee" ,through: notifications_users,  foreignKey: "notificationId" }) // belongs To Many
Users.belongsToMany(Notifications, {through: notifications_users, foreignKey: "addresseeId" }) // belongs To Many

// MUCHOS A MUCHOS --- notifications_users -> muchos STUDENTS
const notifications_students = sequelize.define("notifications_students", {
    idNotificationStudent: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    checkState: {
      type: DataTypes.BOOLEAN,
      defaultValue:false
    },
    score: {
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    comments: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue:null
    },
}, { timestamps: false });

Notifications.belongsToMany(Students, {through: notifications_students,  foreignKey: "notificationsId" }) // belongs To Many
Students.belongsToMany(Notifications, {through: notifications_students, foreignKey: "studentsId" }) // belongs To Many
Notifications.hasMany(notifications_students, { foreignKey: 'notificationIntId' });
notifications_students.belongsTo(Notifications, {foreignKey: 'notificationIntId' });


// UNO-MUCHOS -- users-notificacion
Users.hasMany(Notifications, { foreignKey: 'senderId' });
Notifications.belongsTo(Users, {as: "sender",foreignKey: 'senderId' });

//              NOTICIAS USUARIOS

Users.hasMany(News, {foreignKey: 'users_news'});
News.belongsTo(Users, {as: "poster",foreignKey: 'users_news'});
//              NOTICIAS FAVORITAS

News.hasMany(FavNews, {foreignKey: 'fav_news'});
FavNews.belongsTo(News, {as: "favorites", foreignKey: 'fav_news'});

Users.hasMany(FavNews, {foreignKey: 'fav_user'});
FavNews.belongsTo(Users, {as: "user", foreignKey: 'fav_user'});


// Students.belongsToMany(users_notifications)
// users_notifications.belongsToMany(Students)



/*
Notifications.hasMany(Notifications, {   foreignKey: 'replyedFrom' });
Notifications.belongsTo(Notifications, {as: "replyed",foreignKey: 'replyedFrom' });
*/
Payments.belongsToMany(Users, {through: 'users_payments'}) // belongs To Many
Users.belongsToMany(Payments, {through: 'users_payments'}) // belongs To Many


module.exports = {notifications_users,notifications_students}




































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