'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('branches', 'latitude', {
      type: Sequelize.DECIMAL(11, 7),
      allowNull: true,
      after: 'branch_admin_id'
    });
    await queryInterface.addColumn('branches', 'longitude', {
      type: Sequelize.DECIMAL(11, 7),
      allowNull: true,
      after: 'latitude'
    });
    await queryInterface.addColumn('branches', 'allowed_radius', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 100,
      comment: 'Geofence radius in metres',
      after: 'longitude'
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('branches', 'latitude');
    await queryInterface.removeColumn('branches', 'longitude');
    await queryInterface.removeColumn('branches', 'allowed_radius');
  }
};
