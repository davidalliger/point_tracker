'use strict';
module.exports = (sequelize, DataTypes) => {
  const Payer = sequelize.define('Payer', {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Payer.associate = function(models) {
    // associations can be defined here
  };
  return Payer;
};
