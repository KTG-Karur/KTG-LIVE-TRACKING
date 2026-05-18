'use strict';

const https = require('https');

// Set FCM_SERVER_KEY in your environment variables
const FCM_SERVER_KEY = process.env.FCM_SERVER_KEY || '';

// ─── Internal HTTP helper ─────────────────────────────────────────────────────

function postToFCM(payload) {
    return new Promise((resolve) => {
        const body = JSON.stringify(payload);
        const options = {
            hostname: 'fcm.googleapis.com',
            path: '/fcm/send',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `key=${FCM_SERVER_KEY}`,
                'Content-Length': Buffer.byteLength(body)
            }
        };

        const req = https.request(options, (res) => {
            let raw = '';
            res.on('data', chunk => { raw += chunk; });
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(raw);
                    resolve({ ok: true, parsed });
                } catch {
                    resolve({ ok: false, reason: 'Invalid FCM response' });
                }
            });
        });

        req.on('error', (err) => {
            console.error(`[FCM] Request error: ${err.message}`);
            resolve({ ok: false, reason: err.message });
        });

        req.write(body);
        req.end();
    });
}

function guardKey() {
    if (!FCM_SERVER_KEY) {
        console.warn('[FCM] FCM_SERVER_KEY not configured – notification skipped.');
        return false;
    }
    return true;
}

// ─── Single token ─────────────────────────────────────────────────────────────

/**
 * Send a push notification to one device token.
 *
 * @param {string} fcmToken
 * @param {string} title
 * @param {string} body
 * @param {object} data   - optional key-value data payload
 * @returns {Promise<{success: boolean, messageId?: string, reason?: string}>}
 */
async function sendFCMNotification(fcmToken, title, body, data = {}) {
    if (!guardKey()) return { success: false, reason: 'FCM_SERVER_KEY not configured' };
    if (!fcmToken)   return { success: false, reason: 'FCM token not provided' };

    const { ok, parsed, reason } = await postToFCM({
        to: fcmToken,
        priority: 'high',
        notification: {
            title,
            body,
            sound: 'default',
            priority: 'high',
            android_channel_id: 'location_tracking'
        },
        data: { ...data, click_action: 'FLUTTER_NOTIFICATION_CLICK' }
    });

    if (!ok) return { success: false, reason };

    if (parsed.success === 1) {
        return { success: true, messageId: parsed.results?.[0]?.message_id };
    }
    const err = parsed.results?.[0]?.error || 'FCM delivery failed';
    console.error(`[FCM] Single send failed: ${err}`);
    return { success: false, reason: err };
}

// ─── Multicast (employee + admin in one call) ─────────────────────────────────

/**
 * Send the same push notification to multiple device tokens simultaneously.
 * FCM legacy API supports up to 1000 tokens per request via registration_ids.
 *
 * @param {string[]} tokens  - Array of FCM device tokens
 * @param {string}   title
 * @param {string}   body
 * @param {object}   data    - optional key-value data payload
 * @returns {Promise<{success: boolean, successCount: number, failureCount: number, results: object[]}>}
 */
async function sendFCMToMany(tokens, title, body, data = {}) {
    if (!guardKey()) return { success: false, successCount: 0, failureCount: tokens.length, reason: 'FCM_SERVER_KEY not configured' };

    const validTokens = (tokens || []).filter(Boolean);
    if (validTokens.length === 0) return { success: false, successCount: 0, failureCount: 0, reason: 'No valid tokens provided' };

    const { ok, parsed, reason } = await postToFCM({
        registration_ids: validTokens,
        priority: 'high',
        notification: {
            title,
            body,
            sound: 'default',
            priority: 'high',
            android_channel_id: 'location_tracking'
        },
        data: { ...data, click_action: 'FLUTTER_NOTIFICATION_CLICK' }
    });

    if (!ok) return { success: false, successCount: 0, failureCount: validTokens.length, reason };

    const successCount = parsed.success || 0;
    const failureCount = parsed.failure || 0;

    if (successCount === 0) {
        const err = parsed.results?.[0]?.error || 'All FCM sends failed';
        console.error(`[FCM] Multicast failed: ${err}`);
    }

    return {
        success: successCount > 0,
        successCount,
        failureCount,
        results: parsed.results || []
    };
}

module.exports = { sendFCMNotification, sendFCMToMany };
