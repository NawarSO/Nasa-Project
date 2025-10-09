const express = require('express');
const {
    httpGetAllLaunches,
    httpPostLaunch,
    httpAbortLaunch,
}= require('./launches.controller')
const launchesRouter = express.Router();

launchesRouter.get('/', httpGetAllLaunches); // because we add the route in app.js

launchesRouter.post('/', httpPostLaunch); // because we add the route in app.js

launchesRouter.delete('/:id',httpAbortLaunch );

module.exports = launchesRouter




