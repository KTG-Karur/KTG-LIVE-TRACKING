"use strict";

/**
 * ONE-TIME SCRIPT — Creates a dummy admin user for testing.
 * Run: node seed-dummy-user.js
 *
 * Creates:
 *   Branch    → Head Office
 *   Role      → Admin (role_id 1)
 *   User      → username: admin | password: Admin@123
 *   Staff     → Dummy Admin linked to the user
 *   Page      → Dashboard (required by login service)
 *   RolePerm  → Full access for Admin role
 */

const { sequelize } = require('./models/index');
const { QueryTypes } = require('sequelize');
const CryptoJS = require('crypto-js');

const SECRET_KEY = 'KtgUserpassworD@2011';
const USERNAME   = 'admin';
const PASSWORD   = 'Admin@123';

function encrypt(text) {
    return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
}

async function exists(table, where) {
    const [row] = await sequelize.query(
        `SELECT 1 FROM ${table} WHERE ${where} LIMIT 1`,
        { type: QueryTypes.SELECT }
    );
    return !!row;
}

async function run() {
    try {
        console.log('\n🚀 Starting dummy user seed...\n');

        // ── 1. Branch ────────────────────────────────────────────────────────
        let [branch] = await sequelize.query(
            `SELECT branch_id FROM branches LIMIT 1`,
            { type: QueryTypes.SELECT }
        );
        if (!branch) {
            await sequelize.query(
                `INSERT INTO branches (branch_name, address, city, pincode, email, contact_no, is_active, createdAt, updatedAt)
                 VALUES ('Head Office','KTG Main Office','Karur','639001','admin@ktg.com','9999999999',1,NOW(),NOW())`,
                { type: QueryTypes.INSERT }
            );
            [branch] = await sequelize.query(
                `SELECT branch_id FROM branches ORDER BY branch_id DESC LIMIT 1`,
                { type: QueryTypes.SELECT }
            );
            console.log('✅ Branch created  → branch_id:', branch.branch_id);
        } else {
            console.log('ℹ️  Branch exists  → branch_id:', branch.branch_id);
        }
        const branchId = branch.branch_id;

        // ── 2. Role ──────────────────────────────────────────────────────────
        if (!(await exists('role', 'role_id = 1'))) {
            await sequelize.query(
                `INSERT INTO role (role_id, role_name, is_active, createdAt, updatedAt)
                 VALUES (1,'Admin',1,NOW(),NOW())`,
                { type: QueryTypes.INSERT }
            );
            console.log('✅ Role created    → Admin (role_id: 1)');
        } else {
            console.log('ℹ️  Role exists    → role_id: 1');
        }

        // ── 3. User ──────────────────────────────────────────────────────────
        let [existingUser] = await sequelize.query(
            `SELECT user_id FROM users WHERE user_name = '${USERNAME}' LIMIT 1`,
            { type: QueryTypes.SELECT }
        );
        if (!existingUser) {
            const encPwd = encrypt(PASSWORD);
            await sequelize.query(
                `INSERT INTO users (user_name, password, is_active, createdAt, updatedAt)
                 VALUES ('${USERNAME}','${encPwd}',1,NOW(),NOW())`,
                { type: QueryTypes.INSERT }
            );
            [existingUser] = await sequelize.query(
                `SELECT user_id FROM users WHERE user_name = '${USERNAME}' LIMIT 1`,
                { type: QueryTypes.SELECT }
            );
            console.log('✅ User created    → username: admin | password: Admin@123');
        } else {
            console.log('ℹ️  User exists    → user_id:', existingUser.user_id);
        }
        const userId = existingUser.user_id;

        // ── 4. Staff ─────────────────────────────────────────────────────────
        let [existingStaff] = await sequelize.query(
            `SELECT staff_id FROM staffs WHERE user_id = ${userId} LIMIT 1`,
            { type: QueryTypes.SELECT }
        );
        if (!existingStaff) {
            await sequelize.query(
                `INSERT INTO staffs
                    (first_name, last_name, user_id, role_id, branch_id,
                     staff_code, contact_no, email_id, is_active, createdAt, updatedAt)
                 VALUES
                    ('Dummy','Admin',${userId},1,${branchId},
                     'KTG-ADMIN-001','9000000001','admin@ktg.com',1,NOW(),NOW())`,
                { type: QueryTypes.INSERT }
            );
            [existingStaff] = await sequelize.query(
                `SELECT staff_id FROM staffs WHERE user_id = ${userId} LIMIT 1`,
                { type: QueryTypes.SELECT }
            );
            console.log('✅ Staff created   → Dummy Admin | staff_id:', existingStaff.staff_id);
        } else {
            console.log('ℹ️  Staff exists   → staff_id:', existingStaff.staff_id);
        }

        // ── 5. Page ──────────────────────────────────────────────────────────
        // Describe the actual pages table columns first
        const cols = await sequelize.query(`DESCRIBE pages`, { type: QueryTypes.SELECT });
        const colNames = cols.map(c => c.Field);

        let [existingPage] = await sequelize.query(
            `SELECT page_id FROM pages LIMIT 1`,
            { type: QueryTypes.SELECT }
        );
        if (!existingPage) {
            // Build INSERT dynamically based on which columns actually exist
            const fields   = ['page_id', 'page_name', 'icon_name', 'is_active', 'createdAt', 'updatedAt'];
            const values   = ['1', "'Dashboard'", "'pi pi-home'", '1', 'NOW()', 'NOW()'];

            if (colNames.includes('page_url'))  { fields.push('page_url');  values.push("'/dashboard'"); }
            if (colNames.includes('is_title'))  { fields.push('is_title');  values.push('0'); }
            if (colNames.includes('title'))     { fields.push('title');     values.push("'Dashboard'"); }
            if (colNames.includes('parent_id')) { fields.push('parent_id'); values.push('NULL'); }
            if (colNames.includes('access_ids')){ fields.push('access_ids');values.push("'1,2,3,4,5,6,7,8'"); }

            await sequelize.query(
                `INSERT INTO pages (${fields.join(', ')}) VALUES (${values.join(', ')})`,
                { type: QueryTypes.INSERT }
            );
            console.log('✅ Page created    → Dashboard (page_id: 1)');
        } else {
            console.log('ℹ️  Page exists    → page_id:', existingPage.page_id);
        }

        // ── 6. Role Permission ────────────────────────────────────────────────
        if (!(await exists('role_permission', 'role_id = 1'))) {
            const accessPayload = JSON.stringify({
                access: [
                    { pageId: 1, accessPermission: [1, 2, 3, 4, 5, 6, 7, 8] }
                ]
            }).replace(/'/g, "\\'");
            await sequelize.query(
                `INSERT INTO role_permission (role_id, access_ids, is_active, createdAt, updatedAt)
                 VALUES (1,'${accessPayload}',1,NOW(),NOW())`,
                { type: QueryTypes.INSERT }
            );
            console.log('✅ RolePerm created → Full access for Admin (role_id: 1)');
        } else {
            console.log('ℹ️  RolePerm exists → role_id: 1');
        }

        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('✅  DONE! Test login credentials:');
        console.log('');
        console.log('   Endpoint : GET http://localhost:5088/organization-login');
        console.log('   userName : admin');
        console.log('   password : Admin@123');
        console.log('');
        console.log('   Copy the token from the response and add to headers:');
        console.log('   auth: <token>');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        process.exit(0);
    } catch (err) {
        console.error('\n❌ Seed failed:', err.message);
        process.exit(1);
    }
}

run();
