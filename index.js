const config = require('./config.js');

const { logger } = require('./tools/logger.js'); // require module as logger not the object inside which required by {logger}

const DB = require('./tools/db.js');

const httpServer = require('./http_server.js');

const manager = require('./task/manager.js');


const do_init = async () => {

    // process.env.NODE_ENV = 'production';

    var myid = process.env.nodeid;
    logger.info('my id : ' + myid);

    var redisHost = process.env.redishost;
    var redisPort = process.env.redisport;
    var redisPass = process.env.redispass;
    // for dev only =============  =============
    // export NODE_ENV=production


    var queueName = process.env.queuename;
    manager.init_queue_name(queueName);

    if (process.env.NODE_ENV !== 'production') {
        httpServer.init_arena(redisHost, redisPort, redisPass, queueName);

    }
    var dbHost = process.env.dbhost;
    var dbPort = process.env.dbport;
    var dbUser = process.env.dbuser;
    var dbPass = process.env.dbpass;
    var dbName = process.env.dbname;
    var resp = await DB.init(dbHost, dbPort, dbUser, dbPass, dbName);
    // logger.info(JSON.stringify(resp));
    return resp;

};

const start = () => {
    logger.info('init done , start');
    httpServer.start();
};

const init = async () => {
    var res = await do_init(argv);
    logger.info('init with : ' + JSON.stringify(res));
    start();
}

init();