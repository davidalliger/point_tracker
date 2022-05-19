'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Payers', [
      {
        name: 'NIKE',
        balance: 1000
      },
      {
        name: 'CAMPBELLS',
        balance: 2000
      },
      {
        name: 'NABISCO',
        balance: 500
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Payers', null, {});

  }
};
