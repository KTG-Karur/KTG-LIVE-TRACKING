'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class branch_location_entry_log extends Model {
    static associate(models) {
      branch_location_entry_log.belongsTo(models.branch_location, {
        foreignKey: 'branch_location_id',
        as: 'branchLocation'
      });
      branch_location_entry_log.belongsTo(models.staff, {
        foreignKey: 'staff_id',
        as: 'staff'
      });
    }
  }

  branch_location_entry_log.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    branch_location_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    staff_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    employee_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    branch_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    office_name: {
      type: DataTypes.STRING
    },
    entry_time: {
      type: DataTypes.DATE
    },
    entry_date: {
      type: DataTypes.DATEONLY
    },
    distance_metres: {
      type: DataTypes.DECIMAL(10, 2)
    },
    mobile_model: {
      type: DataTypes.STRING
    },
    battery_level: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Location Reached'
    },
    notification_status: {
      type: DataTypes.STRING,
      defaultValue: 'not_sent'
    },
    notification_sent_at: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'branch_location_entry_log',
    tableName: 'branch_location_entry_logs',
    timestamps: true
  });

  return branch_location_entry_log;
};
