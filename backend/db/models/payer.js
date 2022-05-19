'use strict';
module.exports = (sequelize, DataTypes) => {
  const Payer = sequelize.define('Payer', {
    name: DataTypes.STRING,
    balance: DataTypes.INTEGER
  }, {});
  Payer.associate = function(models) {
    // associations can be defined here
  };
  return Payer;
};