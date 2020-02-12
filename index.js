const path = require('path'),
    fs = require('fs');

const config = require('./config.js');

const { logger } = require('./log/logger.js'); // require module as logger not the object inside which required by {logger}

const DB = require('./tools/db.js');

var argv = process.argv.splice(2);


const init = async (argv) => {

    // process.env.NODE_ENV = 'production';

    var myid = argv[0];
    logger.info('my id : ' + myid);

    var dbHost = argv[1];
    var dbPort = argv[2];
    var dbUser = argv[3];
    var dbPass = argv[4];
    var dbName = argv[5];
    var resp = await DB.init(dbHost, dbPort, dbUser, dbPass, dbName);
    logger.info(JSON.stringify(resp));

};


init(argv);