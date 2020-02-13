const config = require('./config.js');

const { logger } = require('./log/logger.js'); // require module as logger not the object inside which required by {logger}

const DB = require('./tools/db.js');

const httpServer = require('./http_server.js');

const manager = require('./task/manager.js');

var argv = process.argv.splice(2);


const do_init = async (argv) => {

    // process.env.NODE_ENV = 'production';

    var myid = argv[0];
    logger.info('my id : ' + myid);

    var redisHost = argv[7];
    var redisPort = argv[8];
    var redisPass = argv[9];
    // for dev only =============  =============
    // export NODE_ENV=production
    if (process.env.NODE_ENV !== 'production') {
        httpServer.init_arena(redisHost, redisPort, redisPass);

    }

    var queueName = argv[6];
    manager.init_queue_name(queueName);

    var dbHost = argv[1];
    var dbPort = argv[2];
    var dbUser = argv[3];
    var dbPass = argv[4];
    var dbName = argv[5];
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

// node index.js myid 127.0.0.1 32768 root mymaria BRENDER