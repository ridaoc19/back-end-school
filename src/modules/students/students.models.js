const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../src/core/database/db.js");

class Students extends Model {}
Students.init(
  {
idStudent: {
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
  dniStudent: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  birthDate:{
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
  }
  }, { sequelize, timestamps: false }
);

module.exports = Students;