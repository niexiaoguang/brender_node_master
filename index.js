// hello world
const express = require('express'),
    HttpStatus = require('http-status-codes'),
    packageConfig = require('./package.json'),
    path = require('path'),
    crypto = require('crypto'),
    fs = require('fs');

const Api = require('./api.js');

const staticRootPath = '/home/pata/nginx/html/static/upload/blend/';

function handle_error(req, res, errcode) {
    console.log("======  bad req =======");
    // console.log(req);
    res.send('error : ' + errcode);
};


function md5(data) {
    let hash = crypto.createHash('md5');
    return hash.update(data).digest('hex');
};

function auth_req(req) {
    // body...
    var uuid = req.headers['uuid'];
    var ts = req.headers['ts'];
    var fuid = req.headers['fuid'];
    console.log('authReq result : ' + md5(md5(uuid + ts)));
    var res = new String(fuid).valueOf() == new String(md5(md5(uuid + ts))).valueOf()
    return res;

};

function auth_req1(req) {
    return true;
}
// -----------------------------------------------------------

function checkUuid(uuid) {
    return true;
}

// -----------------------------------------------------------

var app = express();


app.get('/api/echo', function(req, res, next) {
    console.log(req.headers);
    if (auth_req1(req)) {

        var uuid = req.query.uuid;
        var start = req.query.start;
        var end = req.query.end;
        var respRawData = {'uuid':uuid,"start":start,"end":end};
        var resp = JSON.stringify(respRawData);
        res.send(resp);

        // res.sendStatus(200);
    } else {
        handleError(req, res, 'bad headers params');
    }
});


app.get('/api/projects', function(req, res, next) {
    console.log(req.headers);
    if (auth_req1(req) &&
        checkUuid(req.query.uuid)

        ) {

        var uuid = req.query.uuid;
        var start = req.query.start;
        var end = req.query.end;


        Api.getProjects(req,res);

        // var respRawData = Api.getProjects(uuid,start,end);
        // var resp = JSON.stringify(respRawData);
        // res.send(resp);

        // res.sendStatus(200);
    } else {
        handleError(req, res, 'bad headers params');
    }
});




app.listen(5000);





// function prepare_path(req) {
//     // body...
//     const staticPath = '/home/pata/nginx/html/static/upload/blend/';

//     var saveToPath = staticPath + req.headers['uuid'] + '/' + req.headers['fuid'] + '/';
//     // create file root path
//     if (!fs.existsSync(saveToPath)) {
//         fs.mkdirSync(saveToPath);
//     }
//     const filename = req.headers['filename'];
//     if (path.extname(filename) == '.zip') {
//         saveToPath += 'addons/';
//         // create sub path
//         if (!fs.existsSync(saveToPath)) {
//             fs.mkdirSync(saveToPath);
//         }
//     };

//     return saveToPath;

// };


