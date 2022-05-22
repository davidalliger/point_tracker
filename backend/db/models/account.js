'use strict';
module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    payer: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Account.associate = function(models) {
    // associations can be defined here
    Account.hasMany(models.Transaction, {
      foreignKey: 'accountId'
    });
  };
  return Account;
};
