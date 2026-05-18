'use strict';

/**
 * Seed: 8 dummy employees across 5 branches.
 *
 * Assumes (from existing seeders):
 *   department_id  1 = Office Staff | 2 = Accountant | 3 = Collection Staff
 *   designation_id 1 = Manager      | 2 = Developer  | 3 = Designer | 4 = Digital Marketing
 *   role_id        1 = Super Admin  | 2 = Admin      | 3 = Employee | 4 = Senior Employee
 *   branch_id      1 = Karur        | 2 = Coimbatore | 3 = Chennai  | 4 = Tirupur | 5 = Trichy
 */

const NOW = new Date();

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('staffs', [
      // ── Branch 1: Karur ────────────────────────────────────────────────────
      {
        staff_code:      'KTG-K001',
        first_name:      'Ravi',
        last_name:       'Kumar',
        age:             32,
        address:         '12 Gandhi Nagar, Karur - 639001',
        contact_no:      '9876543210',
        email_id:        'ravi.kumar@ktghr.com',
        department_id:   1,
        designation_id:  1,      // Manager
        branch_id:       1,      // Karur
        role_id:         2,      // Admin
        date_of_joining: new Date('2022-06-01'),
        dob:             new Date('1993-04-15'),
        gender_id:       1,
        is_active:       1,
        createdAt:       NOW,
        updatedAt:       NOW
      },
      {
        staff_code:      'KTG-K002',
        first_name:      'Priya',
        last_name:       'Lakshmi',
        age:             27,
        address:         '5 Nehru Street, Karur - 639002',
        contact_no:      '9876543211',
        email_id:        'priya.lakshmi@ktghr.com',
        department_id:   1,
        designation_id:  4,      // Digital Marketing
        branch_id:       1,      // Karur
        role_id:         3,      // Employee
        date_of_joining: new Date('2023-01-10'),
        dob:             new Date('1998-09-22'),
        gender_id:       2,
        is_active:       1,
        createdAt:       NOW,
        updatedAt:       NOW
      },

      // ── Branch 2: Coimbatore ──────────────────────────────────────────────
      {
        staff_code:      'KTG-C001',
        first_name:      'Murugan',
        last_name:       'Selvam',
        age:             35,
        address:         '7 RS Puram, Coimbatore - 641002',
        contact_no:      '9865432100',
        email_id:        'murugan.selvam@ktghr.com',
        department_id:   2,
        designation_id:  1,      // Manager
        branch_id:       2,      // Coimbatore
        role_id:         2,      // Admin
        date_of_joining: new Date('2021-03-15'),
        dob:             new Date('1990-07-08'),
        gender_id:       1,
        is_active:       1,
        createdAt:       NOW,
        updatedAt:       NOW
      },
      {
        staff_code:      'KTG-C002',
        first_name:      'Kavitha',
        last_name:       'Devi',
        age:             29,
        address:         '22 Peelamedu, Coimbatore - 641004',
        contact_no:      '9865432101',
        email_id:        'kavitha.devi@ktghr.com',
        department_id:   2,
        designation_id:  3,      // Designer
        branch_id:       2,      // Coimbatore
        role_id:         3,      // Employee
        date_of_joining: new Date('2023-07-01'),
        dob:             new Date('1996-02-14'),
        gender_id:       2,
        is_active:       1,
        createdAt:       NOW,
        updatedAt:       NOW
      },

      // ── Branch 3: Chennai ─────────────────────────────────────────────────
      {
        staff_code:      'KTG-CH001',
        first_name:      'Arjun',
        last_name:       'Raj',
        age:             30,
        address:         '88 T Nagar, Chennai - 600017',
        contact_no:      '9444321001',
        email_id:        'arjun.raj@ktghr.com',
        department_id:   1,
        designation_id:  2,      // Developer
        branch_id:       3,      // Chennai
        role_id:         4,      // Senior Employee
        date_of_joining: new Date('2022-09-01'),
        dob:             new Date('1995-11-30'),
        gender_id:       1,
        is_active:       1,
        createdAt:       NOW,
        updatedAt:       NOW
      },
      {
        staff_code:      'KTG-CH002',
        first_name:      'Deepa',
        last_name:       'Sundaram',
        age:             26,
        address:         '14 Velachery Main Road, Chennai - 600042',
        contact_no:      '9444321002',
        email_id:        'deepa.sundaram@ktghr.com',
        department_id:   3,
        designation_id:  4,      // Digital Marketing
        branch_id:       3,      // Chennai
        role_id:         3,      // Employee
        date_of_joining: new Date('2024-02-01'),
        dob:             new Date('1999-05-17'),
        gender_id:       2,
        is_active:       1,
        createdAt:       NOW,
        updatedAt:       NOW
      },

      // ── Branch 4: Tirupur ─────────────────────────────────────────────────
      {
        staff_code:      'KTG-T001',
        first_name:      'Vijay',
        last_name:       'Anand',
        age:             33,
        address:         '3 Kumaran Colony, Tirupur - 641601',
        contact_no:      '9751234560',
        email_id:        'vijay.anand@ktghr.com',
        department_id:   3,
        designation_id:  1,      // Manager
        branch_id:       4,      // Tirupur
        role_id:         2,      // Admin
        date_of_joining: new Date('2021-11-01'),
        dob:             new Date('1992-08-03'),
        gender_id:       1,
        is_active:       1,
        createdAt:       NOW,
        updatedAt:       NOW
      },

      // ── Branch 5: Trichy ──────────────────────────────────────────────────
      {
        staff_code:      'KTG-TR001',
        first_name:      'Suresh',
        last_name:       'Babu',
        age:             28,
        address:         '56 Woraiyur, Trichy - 620003',
        contact_no:      '9842156780',
        email_id:        'suresh.babu@ktghr.com',
        department_id:   1,
        designation_id:  2,      // Developer
        branch_id:       5,      // Trichy
        role_id:         3,      // Employee
        date_of_joining: new Date('2023-04-01'),
        dob:             new Date('1997-12-25'),
        gender_id:       1,
        is_active:       1,
        createdAt:       NOW,
        updatedAt:       NOW
      }
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('staffs', {
      staff_code: [
        'KTG-K001', 'KTG-K002',
        'KTG-C001', 'KTG-C002',
        'KTG-CH001', 'KTG-CH002',
        'KTG-T001', 'KTG-TR001'
      ]
    }, {});
  }
};
