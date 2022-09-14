const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../src/core/database/db.js");

class News extends Model {}
News.init(
  {
    idNews: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {    //asunto
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {     //contenido
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    creationDate: {
      type: DataTypes.DATEONLY,
    },
    active: {
      type: DataTypes.BOOLEAN,
    },
    likes: {
      type: DataTypes.INTEGER,
    },

  },
  { sequelize,
    modelName: "news",
    timestamps: false }
);
module.exports = News;
