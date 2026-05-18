"use strict";

const Validator = require('fastest-validator')
const { verifyToken } = require("../middleware/auth");
const { ResponseEntry } = require("../helpers/construct-response");
const responseCode = require("../helpers/status-code");
const messages = require("../helpers/message");
const dashboardServices = require("../service/dashboard-service");
const _ = require('lodash');

const schema = {}

async function getDashboard(req, res) {
    const responseEntries = new ResponseEntry();
    try {
        responseEntries.data = await dashboardServices.getDashboard(req.query);
        if (!responseEntries.data) responseEntries.message = messages.DATA_NOT_FOUND;
    } catch (error) {
        responseEntries.error = true;
        responseEntries.message = error.message ? error.message : error;
        responseEntries.code = responseCode.BAD_REQUEST;
        res.status(responseCode.BAD_REQUEST);
    } finally {
        res.send(responseEntries);
    }
}



module.exports = async function (fastify) {
    fastify.route({
        method: 'GET',
        url: '/dashboard',
        preHandler: verifyToken,
        handler: getDashboard
    });

};