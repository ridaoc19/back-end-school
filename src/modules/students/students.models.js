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
      validate: {
        notNull: {
          msg: "The field cannot be null",
        },
        isAlpha: {
          args: true,
          msg: "The name can only contain letters",
        },
        len: {
          args: [3, 20],
          msg: "The name must be between 3 and 20 characters.",
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "The field cannot be null",
        },
        isAlpha: {
          args: true,
          msg: "The last name can only contain letters",
        },
        len: {
          args: [3, 20],
          msg: "The last name must be between 3 and 20 characters long.",
        },
      },
    },
    dniStudent: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "The field cannot be null",
        },
        isInt: true,
      },
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: true,
      },
    },
    active: {
      type: DataTypes.BOOLEAN,
    },
  },
  { sequelize, modelName: "students", timestamps: false }
);

module.exports = Students;
