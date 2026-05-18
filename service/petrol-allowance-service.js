"use strict";

const sequelize = require('../models/index').sequelize;
const messages = require("../helpers/message");
const _ = require('lodash');
const { QueryTypes } = require('sequelize');
const moment = require("moment")

async function getPetrolAllowance(query) {
  try {
    let iql = "";
    let count = 0;

    if (query && Object.keys(query).length) {
      iql += `WHERE`;
      if (query.petrolAllowanceId) {
        iql += count >= 1 ? ` AND` : ``;
        count++;
        iql += ` pa.petrol_allowance_id = ${query.petrolAllowanceId}`;
      }
      if (query.statusId) {
        iql += count >= 1 ? ` AND` : ``;
        count++;
        iql += ` pa.status_id = ${query.statusId}`;
      }
      // if (query.branchId) {
      //   iql += count >= 1 ? ` AND` : ``;
      //   count++;
      //   iql += ` s.branch_id = ${query.branchId}`;
      // }

      if (query.departmentId) {
        iql += count >= 1 ? ` AND` : ``;
        count++;
        iql += ` s.department_id = ${query.departmentId}`;
      }
      if (query.staffId) {
        iql += count >= 1 ? ` AND` : ``;
        count++;
        iql += ` pa.staff_id = ${query.staffId}`;
      }
      if (query.dateFilter) {
        iql += count >= 1 ? ` AND` : ``;
        count++;
        const [Year, Month] = query.dateFilter.split("-");
        if (Month && Year) {
          iql += ` YEAR(pa.allowance_date) = '${Year}' AND MONTH(pa.allowance_date) = '${Month}'`;
        } else if (Year) {
          iql += ` YEAR(pa.allowance_date) = '${Year}'`;
        }
      }
      if (query.isActive) {
        iql += count >= 1 ? ` AND` : ``;
        count++;
        iql += ` pa.is_active = ${query.isActive}`;
      }
      if (query.fromDate) { // Month and year based for Report
        iql += count >= 1 ? ` AND` : ``;
        count++;

        iql += ` ( pa.allowance_date BETWEEN '${moment(query.fromDate).format('YYYY-MM-DD')}' AND '${moment(query.toDate).format('YYYY-MM-DD')}' )`;

        // iql += ` pa.allowance_date BETWEEN '${moment(query.allowanceDate).startOf(query.durationId == 1 ? 'year' : 'month').format('YYYY-MM-DD')}' AND '${moment(query.allowanceDate).endOf(query.durationId == 1 ? 'year' : 'month').format('YYYY-MM-DD')}'`;
      }
      // if (query.branchId || query.branchId == '') {
      //   if (query.branchId !== '') {
      //     iql += count >= 1 ? ` AND` : ``;
      //     count++;
      //     iql += ` s.branch_id = ${query.branchId}`;
      //   }
      // }
      if (query.branchId) {
        iql += count >= 1 ? ` AND` : ``;
        count++;
        if (query.branchId.includes(',')) {
          const branchIds = query.branchId.split(',')
            .map(id => id.trim())
            .filter(id => id !== '');

          if (branchIds.length > 0) {
            const orConditions = branchIds.map(id => `s.branch_id = ${id}`).join(' OR ');
            iql += ` (${orConditions})`;
          }
        } else {
          iql += ` s.branch_id = ${query.branchId}`;
        }
      }
      if (query.departmentId || query.departmentId == '') {
        if (query.departmentId !== '') {
          iql += count >= 1 ? ` AND` : ``;
          count++;
          iql += ` s.department_id = ${query.departmentId}`;
        }
      }
    }

    const result = await sequelize.query(`
  SELECT 
    pa.petrol_allowance_id AS "petrolAllowanceId",
    pa.staff_id AS "staffId",
    s.staff_code AS "staffCode",
    s.staff_profile_image_name AS "staffProfile",
    CONCAT(sur.status_name, '.', s.first_name, ' ', s.last_name) AS "staffName",
    s.vehicle_no AS "vehicleNo",
    des.designation_name AS "designationName",
    dep.department_name AS "departmentName",
    pa.allowance_date AS "allowanceDate",
    COALESCE(vp_from.visit_places_name, pa.from_place) AS "fromPlace",
    COALESCE(vp_to.visit_places_name, pa.to_place) AS "toPlace",
    pa.from_place AS "fromPlaceId",
    pa.to_place AS "toPlaceId",
    pa.activity_id AS "activityId",
    pa.is_active AS "isActive",
    pa.branch_id AS "branchId",
    pa.status_id AS "statusId",
    b.branch_name AS "branchName",
    s.staff_code AS "staffCode",
    (
      SELECT GROUP_CONCAT(a.activity_name SEPARATOR ' & ')
      FROM activities a
      WHERE FIND_IN_SET(a.activity_id, pa.activity_id)
    ) AS "activityName",
    pa.total_km AS "totalKm",
    pa.total_amount AS "totalAmount",
    pa.bill_no AS "billNo",
    pa.name_of_dealer AS "nameOfDealer",
    pa.bill_image_name AS "billImageName",
    pa.createdAt AS "createdAt",
    pa.date_of_purchase AS "dateOfPurchase",
    pa.price_per_litre AS "pricePerLitre",
    pa.qty_per_litre AS "qtyPerLitre",
    pa.is_image_approved AS "isImageApproved"
  FROM petrol_allowances pa
  LEFT JOIN staffs s ON s.staff_id = pa.staff_id
  LEFT JOIN branches b ON b.branch_id = pa.branch_id
  LEFT JOIN designation des ON des.designation_id = s.designation_id
  LEFT JOIN department dep ON dep.department_id = s.department_id
  LEFT JOIN status_lists sur ON sur.status_list_id = s.surname_id
  LEFT JOIN visit_places vp_from ON 
    vp_from.visit_places_id = CASE 
      WHEN pa.from_place REGEXP '^[0-9]+$' THEN pa.from_place 
      ELSE NULL 
    END
  LEFT JOIN visit_places vp_to ON 
    vp_to.visit_places_id = CASE 
      WHEN pa.to_place REGEXP '^[0-9]+$' THEN pa.to_place 
      ELSE NULL 
    END
  ${iql}
  GROUP BY pa.petrol_allowance_id
  ORDER BY pa.createdAt DESC`, {
      type: QueryTypes.SELECT,
      // replacements: {
      //   limit: 100, // or your pagination value
      //   offset: 0   // or your pagination value
      // },
      raw: true,
      nest: false
    });

    return result;
  } catch (error) {
    throw new Error(error.message ? error.message : 'Operation error');
  }
}

async function getPetrolReportAllowance(query) {
  try {
    let conditions = [];

    if (query && Object.keys(query).length) {
      if (query.staffId) {
        conditions.push(`pa.staff_id = ${query.staffId}`);
      }

      if (query.fromDate) {
        conditions.push(`(pa.allowance_date BETWEEN '${moment(query.fromDate).format('YYYY-MM-DD')}' AND '${moment(query.toDate).format('YYYY-MM-DD')}')`);
      }

      // If you want to add dateFilter again later, uncomment this block
      /*
      if (query.dateFilter) {
        conditions.push(`MONTH(pa.allowance_date) = '${moment(query.dateFilter).format("MM")}'`);
      }
      */
    }
    conditions.push('pa.is_active = 1')

    let iql = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

    const result = await sequelize.query(`
  SELECT DISTINCT 
      pa.staff_id AS "staffId",
      CONCAT(sur.status_name, '.', s.first_name, ' ', s.last_name) AS staffName,
      des.designation_name AS "designationName",  
      dep.department_name AS "departmentName",  
      b.branch_name AS "branchName",  
      s.staff_code AS "staffCode",  
      s.vehicle_no AS "vehicleNo",
      GROUP_CONCAT(DISTINCT a.activity_name SEPARATOR ' & ') AS "activityName",
      CONCAT('[', GROUP_CONCAT(
      DISTINCT CASE 
          WHEN pa.bill_no IS NOT NULL THEN
              CONCAT(
    '{"billNo":"', IFNULL(pa.bill_no, ''), '",',
    '"isImageApproved":', IFNULL(pa.is_image_approved, ''), ',',
    '"dateOfPurchase":"', IFNULL(pa.date_of_purchase, ''), '",',
    '"nameOftheDealer":"', REPLACE(IFNULL(pa.name_of_dealer, ''), '"', '\\"'), '",',
    '"billImageName":"', IFNULL(pa.bill_image_name, ''), '",', 
    '"pricePerLitir":"', IFNULL(pa.price_per_litre, '0'), '",', 
    '"qtyPerLitre":"', IFNULL(pa.qty_per_litre, '0'), '",', 
    '"totalAmount":', IFNULL(pa.total_amount, 0), '}'
)
          ELSE NULL
      END
      SEPARATOR ','
  ), ']') AS billDetails,
    CONCAT('[', GROUP_CONCAT(
    CONCAT(
      '{"billNo":"', IFNULL(pa.bill_no, ''), '",',
      '"allowanceDate":"', IFNULL(pa.allowance_date, ''), '",',
       '"isImageApproved":', IFNULL(pa.is_image_approved, ''), ',',
      '"fromPlace":"', IFNULL(
        CASE 
          WHEN vp_from.visit_places_name IS NOT NULL THEN vp_from.visit_places_name
          ELSE pa.from_place
        END, ''
      ), '",',
      '"toPlace":"', REPLACE(IFNULL(
        CASE 
          WHEN vp_to.visit_places_name IS NOT NULL THEN vp_to.visit_places_name
          ELSE pa.to_place
        END, ''
      ), '"', '\\"'), '",',
      '"activityName":"', a.activity_name, '",',
      '"createdAt":"', pa.createdAt, '",',
      '"totalKm":"', IFNULL(pa.total_km, '0'), '",',
      '"totalAmount":', IFNULL(pa.total_amount, 0), '}'
    )
    ORDER BY pa.allowance_date DESC
    SEPARATOR ','
  ), ']') AS petrolPurchase
  FROM petrol_allowances pa
  LEFT JOIN staffs s ON s.staff_id = pa.staff_id
  LEFT JOIN designation des ON des.designation_id = s.designation_id
  LEFT JOIN branches b ON b.branch_id = s.branch_id
  LEFT JOIN status_lists sur ON sur.status_list_id = s.surname_id
  LEFT JOIN department dep ON dep.department_id = s.department_id
  LEFT JOIN activities a ON FIND_IN_SET(a.activity_id, pa.activity_id)
  LEFT JOIN visit_places vp_from ON 
    vp_from.visit_places_id = CASE 
      WHEN pa.from_place REGEXP '^[0-9]+$' THEN pa.from_place 
      ELSE NULL 
    END
  LEFT JOIN visit_places vp_to ON 
    vp_to.visit_places_id = CASE 
      WHEN pa.to_place REGEXP '^[0-9]+$' THEN pa.to_place 
      ELSE NULL 
    END
  ${iql} 
  GROUP BY pa.staff_id, staffName, designationName, departmentName, branchName, staffCode
  ORDER BY pa.allowance_date DESC
`, {
      type: QueryTypes.SELECT,
      raw: true,
      nest: false
    });
    //AND pa.bill_no IS NOT NULL
    return result;
  } catch (error) {
    throw new Error(error.message ? error.message : messages.OPERATION_ERROR);
  }
}

async function createPetrolAllowance(postData) {
  try {
    const excuteMethod = _.mapKeys(postData, (value, key) => _.snakeCase(key))
    const petrolAllowanceResult = await sequelize.models.petrol_allowance.create(excuteMethod);
    const req = {
      petrolAllowanceId: petrolAllowanceResult.petrol_allowance_id
    }
    return await getPetrolAllowance(req);
  } catch (error) {
    throw new Error(error.message ? error.message : messages.OPERATION_ERROR);
  }
}

async function updatePetrolAllowance(petrolAllowanceId, putData) {
  try {
    const excuteMethod = _.mapKeys(putData, (value, key) => _.snakeCase(key))
    const petrolAllowanceResult = await sequelize.models.petrol_allowance.update(excuteMethod, { where: { petrol_allowance_id: petrolAllowanceId } });
    const req = {
      petrolAllowanceId: petrolAllowanceId
    }
    return await getPetrolAllowance(req);
  } catch (error) {
    throw new Error(error.message ? error.message : messages.OPERATION_ERROR);
  }
}

async function approvePetrolAllowanceImage(petrolAllowanceId, user) {
  try {
    if (!user.petrolAllowanceFlag && user.roleName !== 'Super Admin') {
      throw new Error('Not authorized to approve images');
    }

    const [updatedRows] = await sequelize.models.petrol_allowance.update(
      { is_image_approved: 1 },
      {
        where: {
          petrol_allowance_id: petrolAllowanceId,
          is_image_approved: [0, 2]
        }
      }
    );

    if (updatedRows === 0) {
      throw new Error('Petrol allowance record is already approved or not in a request state');
    }

    const req = { petrolAllowanceId: petrolAllowanceId };
    const [updatedRecord] = await getPetrolAllowance(req);
    return updatedRecord;
  } catch (error) {
    throw error;
  }
}

async function disapprovePetrolAllowanceImage(petrolAllowanceId, user) {
  try {
    if (!user.petrolAllowanceFlag && user.roleName !== 'Super Admin') {
      throw new Error('Not authorized to disapprove images');
    }

    const [updatedRows] = await sequelize.models.petrol_allowance.update(
      { is_image_approved: 0 },
      {
        where: {
          petrol_allowance_id: petrolAllowanceId,
          is_image_approved: [1, 2]
        }
      }
    );

    if (updatedRows === 0) {
      throw new Error('Petrol allowance record is already disapproved or not in a request state');
    }

    const req = { petrolAllowanceId: petrolAllowanceId };
    const [updatedRecord] = await getPetrolAllowance(req);
    return updatedRecord;
  } catch (error) {
    throw error;
  }
}




module.exports = {
  getPetrolAllowance,
  getPetrolReportAllowance,
  updatePetrolAllowance,
  createPetrolAllowance,
  approvePetrolAllowanceImage,
  disapprovePetrolAllowanceImage
};