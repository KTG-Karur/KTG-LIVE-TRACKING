'use strict';

const admin = require('firebase-admin');
const path = require('path');

if (!admin.apps.length) {
    const serviceAccount = require(path.join(__dirname, '../ktg-live-tracking-firebase-adminsdk-fbsvc-53d1df558d.json'));
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

/**
 * Send FCM push notification to a single device token.
 * @param {string} token - FCM device token
 * @param {string} title - Notification title
 * @param {string} body - Notification body
 * @param {object} data - Optional key-value data payload
 * @returns {Promise<string>} message ID
 */
async function sendNotification(token, title, body, data = {}) {
    const message = {
        token,
        notification: { title, body },
        data: Object.fromEntries(
            Object.entries(data).map(([k, v]) => [k, String(v)])
        ),
        android: { priority: 'high' },
        apns: { payload: { aps: { sound: 'default' } } }
    };
    const response = await admin.messaging().send(message);
    return response;
}

/**
 * Send FCM push notification to multiple device tokens (up to 500).
 * @param {string[]} tokens - Array of FCM device tokens
 * @param {string} title - Notification title
 * @param {string} body - Notification body
 * @param {object} data - Optional key-value data payload
 * @returns {Promise<admin.messaging.BatchResponse>}
 */
async function sendMulticastNotification(tokens, title, body, data = {}) {
    const message = {
        tokens,
        notification: { title, body },
        data: Object.fromEntries(
            Object.entries(data).map(([k, v]) => [k, String(v)])
        ),
        android: { priority: 'high' },
        apns: { payload: { aps: { sound: 'default' } } }
    };
    const response = await admin.messaging().sendEachForMulticast(message);
    return response;
}

module.exports = { admin, sendNotification, sendMulticastNotification };
