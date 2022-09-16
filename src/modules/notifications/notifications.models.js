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
      type: DataTypes.TEXT,
      allowNull: false,

    },
    body: {     //contenido
      type: DataTypes.TEXT,
      allowNull: false,

    },
    creationDate: {
      type: DataTypes.DATEONLY,
      defaultValue: sequelize.NOW,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    check: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    pay: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    review: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  { sequelize,
    modelName: "notifications",
    timestamps: false }
);
module.exports = Notifications;
