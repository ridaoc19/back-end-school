const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../src/core/database/db.js");

class Users extends Model {}
Users.init(
  {
    idUser: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstNames: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize,
    modelName: "users",
    timestamps: false }
);

module.exports = Users;
