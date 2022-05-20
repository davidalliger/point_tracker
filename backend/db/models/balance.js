'use strict';
module.exports = (sequelize, DataTypes) => {
  const Balance = sequelize.define('Balance', {
    payer: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Balance.associate = function(models) {
    // associations can be defined here
    Balance.hasMany(models.Transaction, {
      foreignKey: 'balanceId'
    });
  };
  return Balance;
};
