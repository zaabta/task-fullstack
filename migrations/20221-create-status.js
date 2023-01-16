'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('status', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      name: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.bulkInsert("status",[
      {name: "todo", createdAt: Sequelize.fn("now"), updatedAt: Sequelize.fn("now")},
      {name: "in progress", createdAt: Sequelize.fn("now"), updatedAt: Sequelize.fn("now")},
      {name: "done", createdAt: Sequelize.fn("now"), updatedAt: Sequelize.fn("now")},
      {name: "canceled", createdAt: Sequelize.fn("now"), updatedAt: Sequelize.fn("now")},
    ])
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('status');
  }
};