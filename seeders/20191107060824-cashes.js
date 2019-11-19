'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Cashes', [
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
        lecture_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        status: 2,
        user_id: 5,
        lecture_id: 30,
        created_at: new Date(),
        updated_at: new Date(),
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Cashes', null, {});
  }
};
