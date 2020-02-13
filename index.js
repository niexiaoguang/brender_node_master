const path = require('path'),
    fs = require('fs');

const Arena = require('bull-arena');

const config = require('./config.js');

const { logger } = require('./log/logger.js'); // require module as logger not the object inside which required by {logger}

const DB = require('./tools/db.js');

const httpServer = require('./http_server.js');

<<<<<<< HEAD
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
=======
const manager = require('./task/manager.js');

var argv = process.argv.splice(2);
>>>>>>> 0.3.1


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