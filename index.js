// hello world
const express = require('express'),
    HttpStatus = require('http-status-codes'),
    packageConfig = require('./package.json'),
    path = require('path'),
    crypto = require('crypto'),
    fs = require('fs'),
    bodyParser = require('body-parser');

const Arena = require('bull-arena');

const config = require('./config.js');

const Api = require('./api.js');

const AuthCheck = require('./auth_check.js');

// create application/json parser
const jsonParser = bodyParser.json();

const arenaConfig = Arena({
    queues: [{
            // Name of the bull queue, this name must match up exactly with what you've defined in bull.
            name: config.JobsQueueName,

            // Hostname or queue prefix, you can put whatever you want.
            hostId: "Job queues",

            // Redis auth.
            redis: {
                port: 6379,
                host: '127.0.0.1',
                password: null
            }
        },
        {
            // Name of the bull queue, this name must match up exactly with what you've defined in bull.
            name: config.TasksQueueName1,

            // Hostname or queue prefix, you can put whatever you want.
            hostId: "Task queues 1",

            // Redis auth.
            redis: {
                port: 6379,
                host: '127.0.0.1',
                password: null
            },
        },
        {
            // Name of the bull queue, this name must match up exactly with what you've defined in bull.
            name: config.TasksQueueName2,

            // Hostname or queue prefix, you can put whatever you want.
            hostId: "Task queues 2",

            // Redis auth.
            redis: {
                port: 6379,
                host: '127.0.0.1',
                password: null
            },
        },
        {
            // Name of the bull queue, this name must match up exactly with what you've defined in bull.
            name: config.TasksQueueName3,

            // Hostname or queue prefix, you can put whatever you want.
            hostId: "Task queues 3",

            // Redis auth.
            redis: {
                port: 6379,
                host: '127.0.0.1',
                password: null
            },
        },
        {
            // Name of the bull queue, this name must match up exactly with what you've defined in bull.
            name: config.TasksQueueName4,

            // Hostname or queue prefix, you can put whatever you want.
            hostId: "Task queues 4",

            // Redis auth.
            redis: {
                port: 6379,
                host: '127.0.0.1',
                password: null
            },
        },
        {
            // Name of the bull queue, this name must match up exactly with what you've defined in bull.
            name: config.TasksQueueName5,

            // Hostname or queue prefix, you can put whatever you want.
            hostId: "Task queues 5",

            // Redis auth.
            redis: {
                port: 6379,
                host: '127.0.0.1',
                password: null
            },
        },

    ],
}, {
    // Make the arena dashboard become available at {my-site.com}/arena.
    basePath: '/arena',

    // Let express handle the listening.
    disableListen: true
});



function handle_error(req, res, errcode) {
    console.log("======  bad req =======");
    // console.log(req);
    res.send('error : ' + errcode);
};



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
        handle_error(req, res, 'bad headers params');
    }
});



// -------------------------------------------------------
app.get('/api/projects', async function(req, res, next) {
    console.log(req.headers);
    if (AuthCheck.auth_req1(req) &&
        AuthCheck.check_uuid(req.query.uuid)

    ) {

        const resp = await Api.get_projects(req);
        res.send(resp);

    } else {
        handle_error(req, res, 'bad headers params');
    }
});



// -------------------------------------------------------
// POST /api/addjob gets JSON bodies
app.post('/api/task/start', jsonParser, async function(req, res, next) {

    if (AuthCheck.auth_req1(req) &&
        AuthCheck.check_req_body(req)
    ) {

        var resp = await Api.start_task(req); //req.body json parsed
        res.send(resp);
    } else {
        handle_error(req, res, 'bad headers params');

    }
});


app.post('/api/task/stop', jsonParser, async function(req, res, next) {

    if (AuthCheck.auth_req1(req) &&
        AuthCheck.check_req_body(req)
    ) {

        const resp = await Api.stop_task(req); //req.body json parsed
        res.send(resp);
    } else {
        handle_error(req, res, 'bad headers params');

    }
});


app.get('/api/task/process', async function(req, res, next) {

    if (AuthCheck.auth_req1(req)) {

        const resp = await Api.task_progress(req); //req.body json parsed
        res.send(resp);
    } else {
        handle_error(req, res, 'bad headers params');

    }
});




app.listen(5000);