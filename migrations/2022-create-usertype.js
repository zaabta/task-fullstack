'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('usertypes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      type: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now")
      }
    });
    await queryInterface.bulkInsert("usertypes",[
      {
        type: "super admin",
      },
      {
        type: "admin",
      },
      {
        type: "user",
      },
    ])
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('usertypes');
  }
};