const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../src/core/database/db.js");

class Course extends Model {}
Course.init(
  {
    idCourse: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
  },
  Course:{
      type: DataTypes.STRING,
      allowNull: false,
  },
  },
  { sequelize, timestamps: false }
);

module.exports = Course;