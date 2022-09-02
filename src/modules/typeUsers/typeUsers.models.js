const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../src/core/database/db.js");

class TypeUsers extends Model {}
TypeUsers.init(
  {
    idTypeUsers: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
  },
  TypeUsers:{
      type: DataTypes.STRING,
      allowNull: false,
  },
  },  { sequelize, timestamps: false }
);

module.exports = TypeUsers;