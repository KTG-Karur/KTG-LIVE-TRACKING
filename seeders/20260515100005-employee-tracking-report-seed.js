'use strict';

/**
 * Seed: 15 employee travel tracking reports across 5 days.
 *
 * Actual staff_ids:
 *   2 = Ravi Kumar | 3 = Priya Lakshmi | 4 = Murugan Selvam | 5 = Kavitha Devi
 *   6 = Arjun Raj  | 7 = Deepa Sundaram | 8 = Vijay Anand   | 9 = Suresh Babu
 */

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('employee_tracking_reports', [

      // ─── 2026-05-11 ───────────────────────────────────────────────────────
      {
        staff_id:            2,
        employee_name:       'Ravi Kumar',
        tracking_date:       '2026-05-11',
        total_distance_km:   42.350,
        mobile_model:        'Samsung Galaxy A54',
        battery_level:       '82%',
        tracking_start_time: new Date('2026-05-11 08:55:00'),
        tracking_end_time:   new Date('2026-05-11 18:30:00'),
        is_active:           1,
        createdAt:           new Date('2026-05-11 18:31:00'),
        updatedAt:           new Date('2026-05-11 18:31:00')
      },
      {
        staff_id:            4,
        employee_name:       'Murugan Selvam',
        tracking_date:       '2026-05-11',
        total_distance_km:   38.120,
        mobile_model:        'OnePlus Nord CE 3',
        battery_level:       '91%',
        tracking_start_time: new Date('2026-05-11 08:50:00'),
        tracking_end_time:   new Date('2026-05-11 17:45:00'),
        is_active:           1,
        createdAt:           new Date('2026-05-11 17:46:00'),
        updatedAt:           new Date('2026-05-11 17:46:00')
      },
      {
        staff_id:            8,
        employee_name:       'Vijay Anand',
        tracking_date:       '2026-05-11',
        total_distance_km:   55.780,
        mobile_model:        'Samsung Galaxy S23',
        battery_level:       '95%',
        tracking_start_time: new Date('2026-05-11 08:45:00'),
        tracking_end_time:   new Date('2026-05-11 19:00:00'),
        is_active:           1,
        createdAt:           new Date('2026-05-11 19:01:00'),
        updatedAt:           new Date('2026-05-11 19:01:00')
      },

      // ─── 2026-05-12 ───────────────────────────────────────────────────────
      {
        staff_id:            3,
        employee_name:       'Priya Lakshmi',
        tracking_date:       '2026-05-12',
        total_distance_km:   22.650,
        mobile_model:        'Xiaomi Redmi Note 12',
        battery_level:       '74%',
        tracking_start_time: new Date('2026-05-12 09:20:00'),
        tracking_end_time:   new Date('2026-05-12 17:00:00'),
        is_active:           1,
        createdAt:           new Date('2026-05-12 17:01:00'),
        updatedAt:           new Date('2026-05-12 17:01:00')
      },
      {
        staff_id:            6,
        employee_name:       'Arjun Raj',
        tracking_date:       '2026-05-12',
        total_distance_km:   31.900,
        mobile_model:        'Apple iPhone 14',
        battery_level:       '68%',
        tracking_start_time: new Date('2026-05-12 09:05:00'),
        tracking_end_time:   new Date('2026-05-12 18:15:00'),
        is_active:           1,
        createdAt:           new Date('2026-05-12 18:16:00'),
        updatedAt:           new Date('2026-05-12 18:16:00')
      },
      {
        staff_id:            5,
        employee_name:       'Kavitha Devi',
        tracking_date:       '2026-05-12',
        total_distance_km:   19.400,
        mobile_model:        'Realme 11 Pro',
        battery_level:       '55%',
        tracking_start_time: new Date('2026-05-12 09:30:00'),
        tracking_end_time:   new Date('2026-05-12 17:30:00'),
        is_active:           1,
        createdAt:           new Date('2026-05-12 17:31:00'),
        updatedAt:           new Date('2026-05-12 17:31:00')
      },

      // ─── 2026-05-13 ───────────────────────────────────────────────────────
      {
        staff_id:            2,
        employee_name:       'Ravi Kumar',
        tracking_date:       '2026-05-13',
        total_distance_km:   51.200,
        mobile_model:        'Samsung Galaxy A54',
        battery_level:       '77%',
        tracking_start_time: new Date('2026-05-13 09:00:00'),
        tracking_end_time:   new Date('2026-05-13 19:30:00'),
        is_active:           1,
        createdAt:           new Date('2026-05-13 19:31:00'),
        updatedAt:           new Date('2026-05-13 19:31:00')
      },
      {
        staff_id:            9,
        employee_name:       'Suresh Babu',
        tracking_date:       '2026-05-13',
        total_distance_km:   24.300,
        mobile_model:        'Oppo Reno 10',
        battery_level:       '38%',
        tracking_start_time: new Date('2026-05-13 09:15:00'),
        tracking_end_time:   new Date('2026-05-13 17:00:00'),
        is_active:           1,
        createdAt:           new Date('2026-05-13 17:01:00'),
        updatedAt:           new Date('2026-05-13 17:01:00')
      },
      {
        staff_id:            7,
        employee_name:       'Deepa Sundaram',
        tracking_date:       '2026-05-13',
        total_distance_km:   18.750,
        mobile_model:        'Vivo V29e',
        battery_level:       '45%',
        tracking_start_time: new Date('2026-05-13 09:40:00'),
        tracking_end_time:   new Date('2026-05-13 16:30:00'),
        is_active:           1,
        createdAt:           new Date('2026-05-13 16:31:00'),
        updatedAt:           new Date('2026-05-13 16:31:00')
      },

      // ─── 2026-05-14 ───────────────────────────────────────────────────────
      {
        staff_id:            4,
        employee_name:       'Murugan Selvam',
        tracking_date:       '2026-05-14',
        total_distance_km:   43.890,
        mobile_model:        'OnePlus Nord CE 3',
        battery_level:       '88%',
        tracking_start_time: new Date('2026-05-14 09:00:00'),
        tracking_end_time:   new Date('2026-05-14 18:45:00'),
        is_active:           1,
        createdAt:           new Date('2026-05-14 18:46:00'),
        updatedAt:           new Date('2026-05-14 18:46:00')
      },
      {
        staff_id:            3,
        employee_name:       'Priya Lakshmi',
        tracking_date:       '2026-05-14',
        total_distance_km:   25.100,
        mobile_model:        'Xiaomi Redmi Note 12',
        battery_level:       '60%',
        tracking_start_time: new Date('2026-05-14 09:20:00'),
        tracking_end_time:   new Date('2026-05-14 17:15:00'),
        is_active:           1,
        createdAt:           new Date('2026-05-14 17:16:00'),
        updatedAt:           new Date('2026-05-14 17:16:00')
      },
      {
        staff_id:            6,
        employee_name:       'Arjun Raj',
        tracking_date:       '2026-05-14',
        total_distance_km:   29.450,
        mobile_model:        'Apple iPhone 14',
        battery_level:       '52%',
        tracking_start_time: new Date('2026-05-14 09:10:00'),
        tracking_end_time:   new Date('2026-05-14 18:00:00'),
        is_active:           1,
        createdAt:           new Date('2026-05-14 18:01:00'),
        updatedAt:           new Date('2026-05-14 18:01:00')
      },
      {
        staff_id:            5,
        employee_name:       'Kavitha Devi',
        tracking_date:       '2026-05-14',
        total_distance_km:   17.600,
        mobile_model:        'Realme 11 Pro',
        battery_level:       '71%',
        tracking_start_time: new Date('2026-05-14 09:35:00'),
        tracking_end_time:   new Date('2026-05-14 16:45:00'),
        is_active:           1,
        createdAt:           new Date('2026-05-14 16:46:00'),
        updatedAt:           new Date('2026-05-14 16:46:00')
      },

      // ─── 2026-05-15 (today) ───────────────────────────────────────────────
      {
        staff_id:            2,
        employee_name:       'Ravi Kumar',
        tracking_date:       '2026-05-15',
        total_distance_km:   33.650,
        mobile_model:        'Samsung Galaxy A54',
        battery_level:       '85%',
        tracking_start_time: new Date('2026-05-15 09:00:00'),
        tracking_end_time:   new Date('2026-05-15 17:30:00'),
        is_active:           1,
        createdAt:           new Date('2026-05-15 17:31:00'),
        updatedAt:           new Date('2026-05-15 17:31:00')
      },
      {
        staff_id:            8,
        employee_name:       'Vijay Anand',
        tracking_date:       '2026-05-15',
        total_distance_km:   49.200,
        mobile_model:        'Samsung Galaxy S23',
        battery_level:       '89%',
        tracking_start_time: new Date('2026-05-15 09:00:00'),
        tracking_end_time:   new Date('2026-05-15 18:30:00'),
        is_active:           1,
        createdAt:           new Date('2026-05-15 18:31:00'),
        updatedAt:           new Date('2026-05-15 18:31:00')
      }

    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('employee_tracking_reports', {
      tracking_date: ['2026-05-11','2026-05-12','2026-05-13','2026-05-14','2026-05-15']
    }, {});
  }
};
