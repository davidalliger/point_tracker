'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Accounts', [
      {
        payer: 'NIKE',
        points: 1000
      },
      {
        payer: 'CAMPBELLS',
        points: 2000
      },
      {
        payer: 'NABISCO',
        points: 500
      },
      {
        payer: 'GENERAL MILLS',
        points: 1200
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Accounts', null, {});

  }
};
