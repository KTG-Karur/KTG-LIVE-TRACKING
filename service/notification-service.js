"use strict";

const sequelize = require("../models/index").sequelize;
const messages = require("../helpers/message");
const _ = require("lodash");
const { QueryTypes } = require("sequelize");
const { generateSerialNumber } = require("../utils/utility");

async function getNotification(query) {
  //   {
  //     "id": 14,
  //     "type": "permission",
  //     "text": "New Permission Request from Mr.PRAVEEN S",
  //     "subText": "For: testing",
  //     "route": "/view/permission",
  //     "date": "2025-04-18T05:48:21.000Z"
  // },
  try {
    const [permissions, leaves, petrols, claims] = await Promise.all([
      sequelize.query(
        `
      SELECT 
        CONCAT(sur.status_name,'.',s.first_name,' ',s.last_name) as staffName, per.permission_id permission_id, per.reason reason, per.createdAt createdAt 
      FROM permissions per
      left join staffs s on s.staff_id = per.staff_id 
      left join status_lists sur on sur.status_list_id = s.surname_id 
      WHERE per.status_id = 28
    `,
        { type: QueryTypes.SELECT }
      ),

      sequelize.query(
        `
      SELECT 
       CONCAT(sur.status_name,'.',s.first_name,' ',s.last_name) as staffName, stl.staff_leave_id staff_leave_id,  stl.reason reason, stl.createdAt createdAt 
      FROM staff_leaves stl
      left join staffs s on s.staff_id = stl.staff_id 
      left join status_lists sur on sur.status_list_id =   s.surname_id 
      WHERE stl.status_id = 28
    `,
        { type: QueryTypes.SELECT }
      ),

      sequelize.query(
        `
      SELECT 
       CONCAT(sur.status_name,'.',s.first_name,' ',s.last_name) as staffName, pe.petrol_allowance_id , pe.bill_no, pe.createdAt 
      FROM petrol_allowances pe
      left join staffs s on s.staff_id = pe.staff_id 
      left join status_lists sur on sur.status_list_id = s.surname_id 
      WHERE pe.status_id = 28 AND pe.bill_no IS NOT NULL
    `,
        { type: QueryTypes.SELECT }
      ),

      sequelize.query(
        `
      SELECT 
       CONCAT(sur.status_name,'.',s.first_name,' ',s.last_name) as staffName,  cl.claim_id claim_id, cl.reason reason, cl.createdAt 
      FROM claims cl
      left join staffs s on s.staff_id = cl.requested_by 
      left join status_lists sur on sur.status_list_id = s.surname_id 
      WHERE cl.status_id = 28
    `,
        { type: QueryTypes.SELECT }
      ),
    ]);

    const formatted = [
      ...permissions.map((item) => ({
        id: item.permission_id,
        type: "permission",
        text: `${item.staffName} - Permission Request`,
        subText: `For: ${item.reason}`,
        route: "/view/permission",
        date: item.createdAt,
      })),
      ...leaves.map((item) => ({
        id: item.staff_leave_id,
        type: "leave",
        text: `${item.staffName} - Staff Leave Request`,
        subText: `For: ${item.reason}`,
        route: "/staff/staff-leave",
        date: item.createdAt,
      })),
      // ...petrols.map((item) => ({
      //   id: item.petrol_allowance_id,
      //   type: "petrol",
      //   text: `${item.staffName} - Petrol Request`,
      //   subText: `For: ${item.bill_no}`,
      //   route: "/allowance/petrol-allowance",
      //   date: item.createdAt,
      // })),
      ...claims.map((item) => ({
        id: item.claim_id,
        type: "claim",
        text: `${item.staffName} - Claim Request`,
        subText: `For: ${item.reason}`,
        route: "/claim/claim-list",
        date: item.createdAt,
      })),
    ];

    return formatted;
  } catch (error) {
    throw new Error(error.message || messages.OPERATION_ERROR);
  }
}

module.exports = {
  getNotification,
};
