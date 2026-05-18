'use strict';

/**
 * Seed: Branch assignment records (branch_locations).
 * Uses actual IDs from the database:
 *   branch_id 1 = Head Office (Karur coords)
 *   branch_id 2 = Chennai
 *   branch_id 3 = Tirupur
 *   branch_id 4 = Trichy
 *
 *   staff_id 2 = Ravi Kumar      | staff_id 3 = Priya Lakshmi
 *   staff_id 4 = Murugan Selvam  | staff_id 5 = Kavitha Devi
 *   staff_id 6 = Arjun Raj       | staff_id 7 = Deepa Sundaram
 *   staff_id 8 = Vijay Anand     | staff_id 9 = Suresh Babu
 */

const NOW = new Date();

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('branch_locations', [
      {
        staff_id:             2,
        employee_name:        'Ravi Kumar',
        branch_id:            1,
        branch_name:          'Head Office',
        registered_latitude:  10.9601270,
        registered_longitude: 78.0766430,
        role:                 'Admin',
        office_entry_time:    '09:00:00',
        tracking_status:      'active',
        notification_status:  'not_sent',
        fcm_token:            'fcm_ravi_kumar_dummy_token_001',
        location_radius:      100,
        is_active:            1,
        createdAt:            NOW,
        updatedAt:            NOW
      },
      {
        staff_id:             3,
        employee_name:        'Priya Lakshmi',
        branch_id:            1,
        branch_name:          'Head Office',
        registered_latitude:  10.9601270,
        registered_longitude: 78.0766430,
        role:                 'Employee',
        office_entry_time:    '09:30:00',
        tracking_status:      'active',
        notification_status:  'not_sent',
        fcm_token:            'fcm_priya_lakshmi_dummy_token_002',
        location_radius:      100,
        is_active:            1,
        createdAt:            NOW,
        updatedAt:            NOW
      },
      {
        staff_id:             4,
        employee_name:        'Murugan Selvam',
        branch_id:            2,
        branch_name:          'Chennai',
        registered_latitude:  13.0826870,
        registered_longitude: 80.2706680,
        role:                 'Admin',
        office_entry_time:    '09:00:00',
        tracking_status:      'active',
        notification_status:  'not_sent',
        fcm_token:            'fcm_murugan_selvam_dummy_token_003',
        location_radius:      120,
        is_active:            1,
        createdAt:            NOW,
        updatedAt:            NOW
      },
      {
        staff_id:             5,
        employee_name:        'Kavitha Devi',
        branch_id:            2,
        branch_name:          'Chennai',
        registered_latitude:  13.0826870,
        registered_longitude: 80.2706680,
        role:                 'Employee',
        office_entry_time:    '09:30:00',
        tracking_status:      'active',
        notification_status:  'not_sent',
        fcm_token:            'fcm_kavitha_devi_dummy_token_004',
        location_radius:      120,
        is_active:            1,
        createdAt:            NOW,
        updatedAt:            NOW
      },
      {
        staff_id:             6,
        employee_name:        'Arjun Raj',
        branch_id:            3,
        branch_name:          'Tirupur',
        registered_latitude:  11.1085310,
        registered_longitude: 77.3410570,
        role:                 'Senior Employee',
        office_entry_time:    '09:00:00',
        tracking_status:      'active',
        notification_status:  'not_sent',
        fcm_token:            'fcm_arjun_raj_dummy_token_005',
        location_radius:      100,
        is_active:            1,
        createdAt:            NOW,
        updatedAt:            NOW
      },
      {
        staff_id:             7,
        employee_name:        'Deepa Sundaram',
        branch_id:            3,
        branch_name:          'Tirupur',
        registered_latitude:  11.1085310,
        registered_longitude: 77.3410570,
        role:                 'Employee',
        office_entry_time:    '09:30:00',
        tracking_status:      'active',
        notification_status:  'not_sent',
        fcm_token:            'fcm_deepa_sundaram_dummy_token_006',
        location_radius:      100,
        is_active:            1,
        createdAt:            NOW,
        updatedAt:            NOW
      },
      {
        staff_id:             8,
        employee_name:        'Vijay Anand',
        branch_id:            4,
        branch_name:          'Trichy',
        registered_latitude:  10.7904860,
        registered_longitude: 78.7047200,
        role:                 'Admin',
        office_entry_time:    '09:00:00',
        tracking_status:      'active',
        notification_status:  'not_sent',
        fcm_token:            'fcm_vijay_anand_dummy_token_007',
        location_radius:      100,
        is_active:            1,
        createdAt:            NOW,
        updatedAt:            NOW
      },
      {
        staff_id:             9,
        employee_name:        'Suresh Babu',
        branch_id:            4,
        branch_name:          'Trichy',
        registered_latitude:  10.7904860,
        registered_longitude: 78.7047200,
        role:                 'Employee',
        office_entry_time:    '09:00:00',
        tracking_status:      'active',
        notification_status:  'not_sent',
        fcm_token:            'fcm_suresh_babu_dummy_token_008',
        location_radius:      100,
        is_active:            1,
        createdAt:            NOW,
        updatedAt:            NOW
      }
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('branch_locations', {
      staff_id: [2, 3, 4, 5, 6, 7, 8, 9]
    }, {});
  }
};
