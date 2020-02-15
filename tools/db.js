const config = require('../config.js');
const mariadb = require('mariadb');
const { logger } = require('./logger.js');


var gHost;
var gPort;
var gUser;
var gPass;
var gDatabase;

const asyncQuery = async (query) => {
    logger.log('info', 'db query : %s', query);
    var resp;
    var conn;
    try {
        conn = await mariadb.createConnection({
            host: gHost,
            port: gPort,
            user: gUser,
            password: gPass,
            database: gDatabase
        });

        resp = await conn.query(query);

    } catch (err) {
        // throw err;
        logger.log('error', 'db error', new Error(err));
        resp = config.DBErrCode;


    } finally {
        if (conn) conn.end(); //release to pool
        return resp;

    }
};


// INSERT INTO person (first_name, last_name) VALUES ('John', 'Doe');
const add_task = async (tuid, uuid, fuid) => {
    var query = 'INSERT INTO ' +
        config.DBTabNameTask +
        ' (' +
        config.DBColNameTuid + ',' +
        config.DBColNameUuid + ',' +
        config.DBColNameFuid + ',' +
        config.DBColNameState +
        ') VALUES (' +
        tuid + ',' +
        uuid + ',' +
        fuid + ',' +
        config.DBStateCodeStarted +
        ')';
    var resp = asyncQuery(query);
    return resp;
};

const get_task_by_uuid = async (uuid) => {
    var query = 'SELECT * FROM ' +
        config.DBTabNameTask +
        ' WHERE ' + config.DBColNameUuid + ' = ' +
        uuid;
    var resp = await asyncQuery(query);
    return resp;
};

const stop_task_by_id = async (tuid, uuid) => {
    var resp = await update_task_state(tuid, uuid, config.DBStateCodeStopped);
    return resp;
}


// ----------------------------------   inner use ================  
const update_task_state = async (tuid, uuid, state) => {
    var query = 'UPDATE ' + config.DBTabNameTask +
        ' SET ' +
        config.DBColNameState + ' = ' + state +
        ' WHERE ' +
        config.DBColNameTuid + ' = ' + tuid +
        ',' +
        config.DBColNameUuid + '=' + uuid;
    var resp = await asyncQuery(query);
    return resp;
}


const check_fuid_uuid = async (fuid, uuid) => {
    var query = 'SELECT * FROM ' +
        config.DBTabNameFiles +
        ' WHERE ' + config.DBColNameFuid + ' = ' +
        fuid;
    var resp = await asyncQuery(query);
    return resp.uuid == uuid;
};




const init = async (host, port, user, pass, dbName) => {
    gHost = host;
    gPort = port;
    gUser = user;
    gPass = pass;
    gDatabase = dbName;

    var resp = await asyncQuery('select now()');
    return resp;
};


exports.stop_task_by_id = stop_task_by_id;
exports.check_fuid_uuid = check_fuid_uuid;
exports.get_task_by_uuid = get_task_by_uuid;
exports.add_task = add_task;
exports.init = init;