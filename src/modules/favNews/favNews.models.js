const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../core/database/db.js");

class FavNews extends Model {}
FavNews.init(
  {
    idFavNews: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    creationDate: {
      type: DataTypes.DATEONLY,
    }
  },
  { sequelize,
    modelName: "favNews",
    timestamps: false }
);
module.exports = FavNews;
