'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('staff_salary_histories', {
      staff_salary_history_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      staff_id: {
        type: Sequelize.INTEGER
      },
      salary_date: {
        type: Sequelize.DATE
      },
      salaried_month: {
        type: Sequelize.STRING
      },
      attendance_based_salary: {
        type: Sequelize.STRING
      },
      deduction_details: {
        type: Sequelize.STRING
      },
      attendance_list: {
        type: Sequelize.STRING
      },
      salary_details: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('staff_salary_histories');
  }
};