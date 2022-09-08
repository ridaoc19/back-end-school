const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../src/core/database/db.js");

class Notifications extends Model {}
Notifications.init(
  {
    idNotifications: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    subject: {    //asunto
      type: DataTypes.STRING,
      allowNull: false,

    },
    body: {     //contenido
      type: DataTypes.STRING,
      allowNull: false,

    },
    creationDate: {
      type: DataTypes.DATEONLY,
    },
    notificationDate: {
      type: DataTypes.DATEONLY,
    },
    active: {
      type: DataTypes.BOOLEAN,
    },
    archived: {
      type: DataTypes.BOOLEAN,
    },
    favorite: {
      type: DataTypes.BOOLEAN,
    },
    check: {
      type: DataTypes.BOOLEAN,
    },
    image: {
      type: DataTypes.STRING,
    }
  },
  { sequelize,
    modelName: "notifications",
    timestamps: false }
);
module.exports = Notifications;
