'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('sports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      teacher: {
        type: Sequelize.STRING
      },
      week: {
        type: Sequelize.STRING
      },
      time: {
        type: Sequelize.INTEGER
      },
      first_num: {
        type: Sequelize.INTEGER
      },
      semester: {
        type: Sequelize.INTEGER
      },
      first_d: {
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('sports');
  }
};