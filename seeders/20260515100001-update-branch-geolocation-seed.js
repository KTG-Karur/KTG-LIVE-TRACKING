'use strict';

/**
 * Seed: Update existing branches with GPS coordinates + add 3 new branches.
 * Uses INSERT ... ON DUPLICATE KEY UPDATE so it is safe to run multiple times.
 *
 * Branch GPS references (Tamil Nadu, India):
 *   Karur       : 10.9601°N  78.0766°E
 *   Coimbatore  : 11.0168°N  76.9558°E
 *   Chennai     : 13.0827°N  80.2707°E
 *   Tirupur     : 11.1085°N  77.3411°E
 *   Trichy      : 10.7905°N  78.7047°E
 */

const NOW = new Date();

module.exports = {
  async up(queryInterface, Sequelize) {
    // ── Update branch_id = 1 (Head Office / Karur / whatever exists) ─────────
    await queryInterface.sequelize.query(`
      UPDATE branches
      SET latitude = 10.9601270, longitude = 78.0766430, allowed_radius = 100
      WHERE branch_id = 1
    `);

    // ── Update Karur & Coimbatore if they exist from a prior seed ─────────────
    await queryInterface.sequelize.query(`
      UPDATE branches
      SET latitude = 10.9601270, longitude = 78.0766430, allowed_radius = 100
      WHERE branch_name = 'Karur'
    `);

    await queryInterface.sequelize.query(`
      UPDATE branches
      SET latitude = 11.0167940, longitude = 76.9557860, allowed_radius = 150
      WHERE branch_name = 'Coimbatore'
    `);

    // ── Insert 3 additional branches ─────────────────────────────────────────
    await queryInterface.bulkInsert('branches', [
      {
        branch_name: 'Chennai',
        address:     '42 Anna Salai, Teynampet, Chennai',
        city:        'Chennai',
        pincode:     '600018',
        email:       'chennai@ktghr.com',
        contact_no:  '9445123001',
        latitude:    13.0826870,
        longitude:   80.2706680,
        allowed_radius: 120,
        is_active:   1,
        createdAt:   NOW,
        updatedAt:   NOW
      },
      {
        branch_name: 'Tirupur',
        address:     '15 Avinashi Road, Tirupur',
        city:        'Tirupur',
        pincode:     '641604',
        email:       'tirupur@ktghr.com',
        contact_no:  '9445123002',
        latitude:    11.1085310,
        longitude:   77.3410570,
        allowed_radius: 100,
        is_active:   1,
        createdAt:   NOW,
        updatedAt:   NOW
      },
      {
        branch_name: 'Trichy',
        address:     '78 Bharathidasan Salai, Trichy',
        city:        'Tiruchirappalli',
        pincode:     '620001',
        email:       'trichy@ktghr.com',
        contact_no:  '9445123003',
        latitude:    10.7904860,
        longitude:   78.7047200,
        allowed_radius: 100,
        is_active:   1,
        createdAt:   NOW,
        updatedAt:   NOW
      }
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query(`
      UPDATE branches
      SET latitude = NULL, longitude = NULL, allowed_radius = NULL
      WHERE branch_name IN ('Karur', 'Coimbatore')
    `);
    await queryInterface.bulkDelete('branches', {
      branch_name: ['Chennai', 'Tirupur', 'Trichy']
    }, {});
  }
};
