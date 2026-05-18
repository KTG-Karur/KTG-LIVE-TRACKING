'use strict';

/**
 * Seed: 15 office arrival entry logs across 5 days.
 *
 * Actual IDs (post-seed):
 *   staff_id 2  = Ravi Kumar      → branch_id 1 (Head Office)
 *   staff_id 3  = Priya Lakshmi   → branch_id 1
 *   staff_id 4  = Murugan Selvam  → branch_id 2 (Chennai)
 *   staff_id 5  = Kavitha Devi    → branch_id 2
 *   staff_id 6  = Arjun Raj       → branch_id 3 (Tirupur)
 *   staff_id 7  = Deepa Sundaram  → branch_id 3
 *   staff_id 8  = Vijay Anand     → branch_id 4 (Trichy)
 *   staff_id 9  = Suresh Babu     → branch_id 4
 *
 * branch_location_id references branch_locations rows (inserted by seed #3):
 *   row 1 → Ravi  | row 2 → Priya | row 3 → Murugan | row 4 → Kavitha
 *   row 5 → Arjun | row 6 → Deepa | row 7 → Vijay   | row 8 → Suresh
 * (IDs depend on auto-increment; we use staff_id as the reliable key)
 */

module.exports = {
  async up(queryInterface) {
    // Fetch the branch_location IDs dynamically
    const [blRows] = await queryInterface.sequelize.query(
      'SELECT id, staff_id FROM branch_locations WHERE staff_id IN (2,3,4,5,6,7,8,9) ORDER BY staff_id'
    );
    const blMap = {};
    blRows.forEach(r => { blMap[r.staff_id] = r.id; });

    await queryInterface.bulkInsert('branch_location_entry_logs', [

      // ─── 2026-05-11 ─────────────────────────────────────────────────────
      {
        branch_location_id:   blMap[2] || null,
        staff_id:             2,
        employee_name:        'Ravi Kumar',
        branch_id:            1,
        office_name:          'Head Office',
        entry_time:           new Date('2026-05-11 09:05:32'),
        entry_date:           '2026-05-11',
        distance_metres:      42.75,
        mobile_model:         'Samsung Galaxy A54',
        battery_level:        '82%',
        status:               'Location Reached',
        notification_status:  'sent',
        notification_sent_at: new Date('2026-05-11 09:05:34'),
        createdAt:            new Date('2026-05-11 09:05:32'),
        updatedAt:            new Date('2026-05-11 09:05:34')
      },
      {
        branch_location_id:   blMap[3] || null,
        staff_id:             3,
        employee_name:        'Priya Lakshmi',
        branch_id:            1,
        office_name:          'Head Office',
        entry_time:           new Date('2026-05-11 09:28:14'),
        entry_date:           '2026-05-11',
        distance_metres:      67.10,
        mobile_model:         'Xiaomi Redmi Note 12',
        battery_level:        '74%',
        status:               'Location Reached',
        notification_status:  'sent',
        notification_sent_at: new Date('2026-05-11 09:28:16'),
        createdAt:            new Date('2026-05-11 09:28:14'),
        updatedAt:            new Date('2026-05-11 09:28:16')
      },
      {
        branch_location_id:   blMap[4] || null,
        staff_id:             4,
        employee_name:        'Murugan Selvam',
        branch_id:            2,
        office_name:          'Chennai',
        entry_time:           new Date('2026-05-11 09:03:47'),
        entry_date:           '2026-05-11',
        distance_metres:      88.30,
        mobile_model:         'OnePlus Nord CE 3',
        battery_level:        '91%',
        status:               'Location Reached',
        notification_status:  'sent',
        notification_sent_at: new Date('2026-05-11 09:03:49'),
        createdAt:            new Date('2026-05-11 09:03:47'),
        updatedAt:            new Date('2026-05-11 09:03:49')
      },

      // ─── 2026-05-12 ─────────────────────────────────────────────────────
      {
        branch_location_id:   blMap[5] || null,
        staff_id:             5,
        employee_name:        'Kavitha Devi',
        branch_id:            2,
        office_name:          'Chennai',
        entry_time:           new Date('2026-05-12 09:35:10'),
        entry_date:           '2026-05-12',
        distance_metres:      135.60,
        mobile_model:         'Realme 11 Pro',
        battery_level:        '55%',
        status:               'Outside Radius',
        notification_status:  'not_sent',
        notification_sent_at: null,
        createdAt:            new Date('2026-05-12 09:35:10'),
        updatedAt:            new Date('2026-05-12 09:35:10')
      },
      {
        branch_location_id:   blMap[6] || null,
        staff_id:             6,
        employee_name:        'Arjun Raj',
        branch_id:            3,
        office_name:          'Tirupur',
        entry_time:           new Date('2026-05-12 09:10:22'),
        entry_date:           '2026-05-12',
        distance_metres:      53.40,
        mobile_model:         'Apple iPhone 14',
        battery_level:        '68%',
        status:               'Location Reached',
        notification_status:  'sent',
        notification_sent_at: new Date('2026-05-12 09:10:24'),
        createdAt:            new Date('2026-05-12 09:10:22'),
        updatedAt:            new Date('2026-05-12 09:10:24')
      },
      {
        branch_location_id:   blMap[7] || null,
        staff_id:             7,
        employee_name:        'Deepa Sundaram',
        branch_id:            3,
        office_name:          'Tirupur',
        entry_time:           new Date('2026-05-12 09:42:55'),
        entry_date:           '2026-05-12',
        distance_metres:      79.15,
        mobile_model:         'Vivo V29e',
        battery_level:        '45%',
        status:               'Location Reached',
        notification_status:  'failed',
        notification_sent_at: new Date('2026-05-12 09:42:57'),
        createdAt:            new Date('2026-05-12 09:42:55'),
        updatedAt:            new Date('2026-05-12 09:42:57')
      },

      // ─── 2026-05-13 ─────────────────────────────────────────────────────
      {
        branch_location_id:   blMap[8] || null,
        staff_id:             8,
        employee_name:        'Vijay Anand',
        branch_id:            4,
        office_name:          'Trichy',
        entry_time:           new Date('2026-05-13 09:01:08'),
        entry_date:           '2026-05-13',
        distance_metres:      35.90,
        mobile_model:         'Samsung Galaxy S23',
        battery_level:        '95%',
        status:               'Location Reached',
        notification_status:  'sent',
        notification_sent_at: new Date('2026-05-13 09:01:10'),
        createdAt:            new Date('2026-05-13 09:01:08'),
        updatedAt:            new Date('2026-05-13 09:01:10')
      },
      {
        branch_location_id:   blMap[9] || null,
        staff_id:             9,
        employee_name:        'Suresh Babu',
        branch_id:            4,
        office_name:          'Trichy',
        entry_time:           new Date('2026-05-13 09:18:44'),
        entry_date:           '2026-05-13',
        distance_metres:      61.20,
        mobile_model:         'Oppo Reno 10',
        battery_level:        '38%',
        status:               'Location Reached',
        notification_status:  'sent',
        notification_sent_at: new Date('2026-05-13 09:18:46'),
        createdAt:            new Date('2026-05-13 09:18:44'),
        updatedAt:            new Date('2026-05-13 09:18:46')
      },
      {
        branch_location_id:   blMap[2] || null,
        staff_id:             2,
        employee_name:        'Ravi Kumar',
        branch_id:            1,
        office_name:          'Head Office',
        entry_time:           new Date('2026-05-13 09:07:30'),
        entry_date:           '2026-05-13',
        distance_metres:      49.85,
        mobile_model:         'Samsung Galaxy A54',
        battery_level:        '77%',
        status:               'Location Reached',
        notification_status:  'sent',
        notification_sent_at: new Date('2026-05-13 09:07:32'),
        createdAt:            new Date('2026-05-13 09:07:30'),
        updatedAt:            new Date('2026-05-13 09:07:32')
      },

      // ─── 2026-05-14 ─────────────────────────────────────────────────────
      {
        branch_location_id:   blMap[3] || null,
        staff_id:             3,
        employee_name:        'Priya Lakshmi',
        branch_id:            1,
        office_name:          'Head Office',
        entry_time:           new Date('2026-05-14 09:22:05'),
        entry_date:           '2026-05-14',
        distance_metres:      73.40,
        mobile_model:         'Xiaomi Redmi Note 12',
        battery_level:        '60%',
        status:               'Location Reached',
        notification_status:  'sent',
        notification_sent_at: new Date('2026-05-14 09:22:07'),
        createdAt:            new Date('2026-05-14 09:22:05'),
        updatedAt:            new Date('2026-05-14 09:22:07')
      },
      {
        branch_location_id:   blMap[4] || null,
        staff_id:             4,
        employee_name:        'Murugan Selvam',
        branch_id:            2,
        office_name:          'Chennai',
        entry_time:           new Date('2026-05-14 09:00:55'),
        entry_date:           '2026-05-14',
        distance_metres:      220.10,
        mobile_model:         'OnePlus Nord CE 3',
        battery_level:        '88%',
        status:               'Outside Radius',
        notification_status:  'not_sent',
        notification_sent_at: null,
        createdAt:            new Date('2026-05-14 09:00:55'),
        updatedAt:            new Date('2026-05-14 09:00:55')
      },
      {
        branch_location_id:   blMap[6] || null,
        staff_id:             6,
        employee_name:        'Arjun Raj',
        branch_id:            3,
        office_name:          'Tirupur',
        entry_time:           new Date('2026-05-14 09:15:33'),
        entry_date:           '2026-05-14',
        distance_metres:      98.60,
        mobile_model:         'Apple iPhone 14',
        battery_level:        '52%',
        status:               'Location Reached',
        notification_status:  'sent',
        notification_sent_at: new Date('2026-05-14 09:15:35'),
        createdAt:            new Date('2026-05-14 09:15:33'),
        updatedAt:            new Date('2026-05-14 09:15:35')
      },

      // ─── 2026-05-15 (today) ─────────────────────────────────────────────
      {
        branch_location_id:   blMap[8] || null,
        staff_id:             8,
        employee_name:        'Vijay Anand',
        branch_id:            4,
        office_name:          'Trichy',
        entry_time:           new Date('2026-05-15 09:02:18'),
        entry_date:           '2026-05-15',
        distance_metres:      28.50,
        mobile_model:         'Samsung Galaxy S23',
        battery_level:        '89%',
        status:               'Location Reached',
        notification_status:  'sent',
        notification_sent_at: new Date('2026-05-15 09:02:20'),
        createdAt:            new Date('2026-05-15 09:02:18'),
        updatedAt:            new Date('2026-05-15 09:02:20')
      },
      {
        branch_location_id:   blMap[7] || null,
        staff_id:             7,
        employee_name:        'Deepa Sundaram',
        branch_id:            3,
        office_name:          'Tirupur',
        entry_time:           new Date('2026-05-15 09:45:00'),
        entry_date:           '2026-05-15',
        distance_metres:      145.00,
        mobile_model:         'Vivo V29e',
        battery_level:        '72%',
        status:               'Outside Radius',
        notification_status:  'not_sent',
        notification_sent_at: null,
        createdAt:            new Date('2026-05-15 09:45:00'),
        updatedAt:            new Date('2026-05-15 09:45:00')
      },
      {
        branch_location_id:   blMap[9] || null,
        staff_id:             9,
        employee_name:        'Suresh Babu',
        branch_id:            4,
        office_name:          'Trichy',
        entry_time:           new Date('2026-05-15 09:09:47'),
        entry_date:           '2026-05-15',
        distance_metres:      55.70,
        mobile_model:         'Oppo Reno 10',
        battery_level:        '66%',
        status:               'Location Reached',
        notification_status:  'pending',
        notification_sent_at: null,
        createdAt:            new Date('2026-05-15 09:09:47'),
        updatedAt:            new Date('2026-05-15 09:09:47')
      }

    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('branch_location_entry_logs', {
      entry_date: ['2026-05-11','2026-05-12','2026-05-13','2026-05-14','2026-05-15']
    }, {});
  }
};
