// sequelize seed:generate --name users

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Users', [
      {
        name: 'Alice',
        cnsName: 't12356jd',
        email: 'alice@aaaa.com',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Bob',
        cnsName: 't23456bt',
        email: 'bob@aaaa.com',
        created_at: new Date(),
        updated_at:　new Date()
      },
      {
        name: 'Charlie',
        cnsName: 't34567ts',
        email: 'charliea@aaaa.com',
        created_at: new Date(),
        updated_at:　new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};
