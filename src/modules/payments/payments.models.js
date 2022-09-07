const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../src/core/database/db.js");

class Payments extends Model {}
Payments.init(
  {
idPayment: {
  type: DataTypes.INTEGER,
  primaryKey: true,
  autoIncrement: true,
  },
  detail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  state: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
  },
  paymentDate:{
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
  }
  }, { sequelize,
    modelName: "payments",
     timestamps: false }
);

module.exports = Payments;