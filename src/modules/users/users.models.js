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
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: "El campo tiene que ser un correo valido"
      }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
    }
  },
  { sequelize,
    modelName: "users",
    timestamps: false }
);

module.exports = Users;
