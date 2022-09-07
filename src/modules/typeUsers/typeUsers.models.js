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
  typeUsers:{
      type: DataTypes.STRING,
      allowNull: false,
  },
  },  { sequelize,
      modelName: "typeusers",
     timestamps: false }
);

module.exports = TypeUsers;