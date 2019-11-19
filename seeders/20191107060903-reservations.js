'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reservations', [
      {
        status: 0,
        user_id: 5,
        lecture_id: 14,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        status: 0,
        user_id: 5,
        lecture_id: 27,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        status: 0,
        user_id: 5,
        lecture_id: 163,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        status: 2,
        user_id: 5,
        lecture_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        status: 2,
        user_id: 5,
        lecture_id: 199,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        status: 1,
        user_id: 5,
        lecture_id: 72,
        created_at: new Date(),
        updated_at: new Date(),
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Reservations', null, {});
  }
};
