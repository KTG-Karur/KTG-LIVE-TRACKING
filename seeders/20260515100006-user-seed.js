'use strict';

/**
 * Seed: Admin & Employee user accounts for login testing.
 *
 * Passwords are AES-encrypted at seed time using the same
 * secret key as the application (KtgUserpassworD@2011).
 *
 * Login credentials:
 *   Admin    → userName: admin       password: Admin@123
 *   Admin    → userName: ravi.kumar  password: Admin@123
 *   Employee → userName: priya       password: Emp@123
 *   Employee → userName: murugan     password: Emp@123
 *
 * Login endpoint:
 *   GET http://localhost:5088/organization-login?userName=admin&password=Admin@123
 */

const CryptoJS = require('crypto-js');
const SECRET   = 'KtgUserpassworD@2011';

function encryptPwd(plain) {
  return CryptoJS.AES.encrypt(plain, SECRET).toString();
}

const NOW = new Date();

module.exports = {
  async up(queryInterface) {
    // Skip 'admin' – already seeded; only insert new users
    await queryInterface.sequelize.query(`
      INSERT IGNORE INTO users (user_name, password, is_active, createdAt, updatedAt) VALUES
      ('ravi.kumar', '${encryptPwd('Admin@123')}', 1, NOW(), NOW()),
      ('priya',      '${encryptPwd('Emp@123')}',   1, NOW(), NOW()),
      ('murugan',    '${encryptPwd('Emp@123')}',   1, NOW(), NOW())
    `);

    // Link users to staff records so login query can join them
    // user_id auto-increments; we update staffs.user_id to match
    await queryInterface.sequelize.query(`
      UPDATE staffs s
      JOIN users u ON u.user_name = 'ravi.kumar'
      SET s.user_id = u.user_id
      WHERE s.staff_code = 'KTG-K001'
    `);

    await queryInterface.sequelize.query(`
      UPDATE staffs s
      JOIN users u ON u.user_name = 'priya'
      SET s.user_id = u.user_id
      WHERE s.staff_code = 'KTG-K002'
    `);

    await queryInterface.sequelize.query(`
      UPDATE staffs s
      JOIN users u ON u.user_name = 'murugan'
      SET s.user_id = u.user_id
      WHERE s.staff_code = 'KTG-C001'
    `);
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query(`
      UPDATE staffs SET user_id = NULL
      WHERE staff_code IN ('KTG-K001', 'KTG-K002', 'KTG-C001')
    `);
    await queryInterface.bulkDelete('users', {
      user_name: ['admin', 'ravi.kumar', 'priya', 'murugan']
    }, {});
  }
};
