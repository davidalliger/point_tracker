'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    accountId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Accounts' }
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {});
  Transaction.associate = function(models) {
    // associations can be defined here
    Transaction.belongsTo(models.Account, {
      foreignKey: 'accountId'
    });
  };
  return Transaction;
};
