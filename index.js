// hello world
const express = require('express'),
    HttpStatus = require('http-status-codes'),
    packageConfig = require('./package.json'),
    path = require('path'),
    crypto = require('crypto'),
    fs = require('fs'),
    bodyParser = require('body-parser');

const config = require('./config.js');

const Api = require('./api.js');

const AuthCheck = require('./tools/auth_check.js');

// create application/json parser
const jsonParser = bodyParser.json();

const Arena = require('bull-arena');

const logger = require('./tools/logger.js');


function handle_error(req, res, errcode) {
    console.log("======  bad req =======");
    // console.log(req);
    res.send('error : ' + errcode);
};

const arenaConfig = Arena({
    queues: [{
        // Name of the bull queue, this name must match up exactly with what you've defined in bull.
        name: config.JobsQueueName,

        // Hostname or queue prefix, you can put whatever you want.
        hostId: "Brender Job Queues",

        // Redis auth.
        redis: {
            port: 6379,
            host: '127.0.0.1',
            password: null,
        },
    }, ],
}, {
    // Make the arena dashboard become available at {my-site.com}/arena.
    basePath: '/arena',

    // Let express handle the listening.
    disableListen: true
});


var app = express();

app.use('/', arenaConfig);

// -------------------------------------------------------
app.get('/api/echo', function(req, res, next) {
    console.log(req.headers);
    if (AuthCheck.auth_req1(req)) {

        var uuid = req.query.uuid;
        var start = req.query.start;
        var end = req.query.end;
        var respRawData = { 'uuid': uuid, "start": start, "end": end };
        var resp = JSON.stringify(respRawData);
        res.send(resp);

        // res.sendStatus(200);
    } else {

        res.send(config.AuthCheckErrResp);
    }
});



// +-------------------------------------------------------
app.get('/api/task/all', async function(req, res, next) {
    console.log(req.headers);
    if (AuthCheck.auth_req1(req) &&
        AuthCheck.check_uuid(req.query.uuid)

    ) {
        logger.info(req);
        const resp = await Api.get_all_task(req);
        res.send(resp);

    } else {
        logger.log('error', 'req auth', new Error(req));
        res.send(config.AuthCheckErrResp);
    }
});


// -------------------------------------------------------
app.get('/api/task/running', async function(req, res, next) {
    console.log(req.headers);
    if (AuthCheck.auth_req1(req) &&
        AuthCheck.check_uuid(req.query.uuid)

    ) {
        logger.info(req);
        const resp = await Api.get_running_task(req);
        res.send(resp);

    } else {
        logger.log('error', 'req auth', new Error(req));
        res.send(config.AuthCheckErrResp);
    }
});


// +-------------------------------------------------------
// POST /api/addjob gets JSON bodies
app.post('/api/task/start', jsonParser, async function(req, res, next) {

    if (AuthCheck.auth_req1(req) &&
        AuthCheck.check_req_body(req)
    ) {

        logger.info(req);
        var reqData = req.body;
        var resp = await Api.start_task(reqData); //req.body json parsed
        res.send(resp);
    } else {
        logger.log('error', 'req auth', new Error(req));

        res.send(config.AuthCheckErrResp);

    }
});

// +-------------------------------------------------------
app.post('/api/task/stop', jsonParser, async function(req, res, next) {

    if (AuthCheck.auth_req1(req) &&
        AuthCheck.check_req_body(req)
    ) {

        logger.info(req);
        const resp = await Api.stop_task(req); //req.body json parsed
        res.send(resp);
    } else {

        logger.log('error', 'req auth', new Error(req));

        res.send(config.AuthCheckErrResp);

    }
});


app.get('/api/task/process', async function(req, res, next) {

    if (AuthCheck.auth_req1(req)) {
        logger.info(req);
        const resp = await Api.task_progress(req); //req.body json parsed
        res.send(resp);
    } else {

        logger.log('error', 'req auth', new Error(req));
        res.send(config.AuthCheckErrResp);

    }
});




app.listen(5000);