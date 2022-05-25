'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Transactions', [
        {
          accountId: 1,
          points: 600,
          timestamp: new Date('2021-12-17T16:00:00')
        },
        {
          accountId: 2,
          points: 300,
          timestamp: new Date('2021-10-20T15:00:00')
        },
        {
          accountId: 3,
          points: 500,
          timestamp: new Date('2022-03-20T11:00:00')
        },
        {
          accountId: 1,
          points: -300,
          timestamp: new Date('2022-01-04T13:00:00')
        },
        {
          accountId: 4,
          points: 700,
          timestamp: new Date('2022-01-04T16:00:00')
        },
        {
          accountId: 2,
          points: 600,
          timestamp: new Date('2022-01-13T18:00:00')
        },
        {
          accountId: 1,
          points: 700,
          timestamp: new Date('2022-02-06T16:00:00')
        },
        {
          accountId: 2,
          points: -100,
          timestamp: new Date('2022-03-10T10:00:00')
        },
        {
          accountId: 4,
          points: -200,
          timestamp: new Date('2022-03-10T12:00:00')
        },
        {
          accountId: 4,
          points: 700,
          timestamp: new Date('2022-03-09T11:00:00')
        },
        {
          accountId: 2,
          points: 1200,
          timestamp: new Date('2022-03-16T11:00:00')
        }
    ], {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Transactions', null, {});

  }
};
