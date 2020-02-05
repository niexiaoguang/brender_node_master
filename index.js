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

const AuthCheck = require('./auth_check.js');

// create application/json parser
const jsonParser = bodyParser.json();


function handle_error(req, res, errcode) {
    console.log("======  bad req =======");
    // console.log(req);
    res.send('error : ' + errcode);
};



var app = express();

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
app.get('/api/projects', function(req, res, next) {
    console.log(req.headers);
    if (AuthCheck.auth_req1(req) &&
        AuthCheck.check_uuid(req.query.uuid)

    ) {

        Api.get_projects(req, res);

    } else {
        handle_error(req, res, 'bad headers params');
    }
});



// -------------------------------------------------------
// POST /api/addjob gets JSON bodies
app.post('/api/addjob', jsonParser, function(req, res, next) {

    if (AuthCheck.auth_req1(req) &&
        AuthCheck.check_req_body(req)
    ) {
        console.log(req.body);
        res.send('ok');

        // Api.add_job(req, res); //req.body json parsed 
    } else {
        handle_error(req, res, 'bad headers params');

    }
});




app.listen(5000);