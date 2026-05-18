"use strict";

const sequelize = require('../models/index').sequelize;
const messages  = require("../helpers/message");
const { QueryTypes } = require('sequelize');

// ─── Base fetch query ─────────────────────────────────────────────────────────
async function fetchEntryLogs(whereClause = '') {
    return sequelize.query(`
        SELECT
            el.id                    "entryLogId",
            el.branch_location_id    "branchLocationId",
            el.staff_id              "staffId",
            el.employee_name         "employeeName",
            el.branch_id             "branchId",
            el.office_name           "officeName",
            el.entry_time            "entryTime",
            el.entry_date            "entryDate",
            el.distance_metres       "distanceMetres",
            el.mobile_model          "mobileModel",
            el.battery_level         "batteryLevel",
            el.status                "status",
            el.notification_status   "notificationStatus",
            el.notification_sent_at  "notificationSentAt",
            el.createdAt             "createdAt",
            el.updatedAt             "updatedAt",
            s.staff_code             "staffCode",
            s.contact_no             "staffContactNo",
            CONCAT(s.first_name, ' ', s.last_name) "staffFullName",
            b.branch_name            "registeredBranchName",
            b.city                   "branchCity"
        FROM branch_location_entry_logs el
        LEFT JOIN staffs   s ON s.staff_id  = el.staff_id
        LEFT JOIN branches b ON b.branch_id = el.branch_id
        ${whereClause}
        ORDER BY el.entry_time DESC
    `, { type: QueryTypes.SELECT, raw: true, nest: false });
}

// ─── GET – entry logs with filters ───────────────────────────────────────────
async function getEntryLogs(query) {
    try {
        const conditions = [];

        if (query.entryLogId)       conditions.push(`el.id = ${parseInt(query.entryLogId)}`);
        if (query.staffId)          conditions.push(`el.staff_id = ${parseInt(query.staffId)}`);
        if (query.branchId)         conditions.push(`el.branch_id = ${parseInt(query.branchId)}`);
        if (query.branchLocationId) conditions.push(`el.branch_location_id = ${parseInt(query.branchLocationId)}`);

        if (query.employeeName) {
            const safe = query.employeeName.replace(/'/g, "''");
            conditions.push(`el.employee_name LIKE '%${safe}%'`);
        }

        if (query.date)      conditions.push(`el.entry_date = '${query.date}'`);
        if (query.fromDate && query.toDate)
                             conditions.push(`el.entry_date BETWEEN '${query.fromDate}' AND '${query.toDate}'`);
        if (query.status)    conditions.push(`el.status = '${query.status}'`);
        if (query.notificationStatus)
                             conditions.push(`el.notification_status = '${query.notificationStatus}'`);

        const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
        return await fetchEntryLogs(whereClause);
    } catch (error) {
        throw new Error(error.message || messages.OPERATION_ERROR);
    }
}

// ─── PUT – admin correction of an entry log ───────────────────────────────────
async function updateEntryLog(entryLogId, putData) {
    try {
        const record = await sequelize.models.branch_location_entry_log.findOne({
            where: { id: entryLogId },
            attributes: ['id']
        });
        if (!record) throw new Error(messages.DATA_NOT_FOUND);

        const allowedFields = [
            'employee_name', 'office_name', 'entry_time', 'entry_date',
            'distance_metres', 'mobile_model', 'battery_level',
            'status', 'notification_status'
        ];

        const updatePayload = {};
        for (const [key, val] of Object.entries(putData)) {
            const snake = key.replace(/([A-Z])/g, '_$1').toLowerCase();
            if (allowedFields.includes(snake)) updatePayload[snake] = val;
        }

        if (Object.keys(updatePayload).length === 0) {
            throw new Error('No valid fields provided for update.');
        }

        await sequelize.models.branch_location_entry_log.update(
            updatePayload,
            { where: { id: entryLogId } }
        );

        const rows = await fetchEntryLogs(`WHERE el.id = ${parseInt(entryLogId)}`);
        return rows[0] || null;
    } catch (error) {
        throw new Error(error.message || messages.OPERATION_ERROR);
    }
}

// ─── DELETE ───────────────────────────────────────────────────────────────────
async function deleteEntryLog(entryLogId) {
    try {
        const record = await sequelize.models.branch_location_entry_log.findOne({
            where: { id: entryLogId },
            attributes: ['id']
        });
        if (!record) throw new Error(messages.DATA_NOT_FOUND);

        await sequelize.models.branch_location_entry_log.destroy({ where: { id: entryLogId } });
        return { entryLogId: parseInt(entryLogId), deleted: true };
    } catch (error) {
        throw new Error(error.message || messages.OPERATION_ERROR);
    }
}

module.exports = { getEntryLogs, updateEntryLog, deleteEntryLog };
