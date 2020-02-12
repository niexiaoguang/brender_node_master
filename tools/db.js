const config = require('../config.js');
const mariadb = require('mariadb');
const { logger } = require('../log/logger.js');


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

const get_task_state_by_fuid = async (fuid) => {
    var query = 'SELECT * FROM ' +
        config.DBTaskTabName +
        ' WHERE ' + config.DBFuidColName + ' = ' +
        fuid;
    var resp = await asyncQuery(query);
    return resp;
};

const get_task_state_by_uuid = async (uuid) => {
    var query = 'SELECT * FROM ' +
        config.DBTaskTabName +
        ' WHERE ' + config.DBUuidColName + ' = ' +
        uuid;
    var resp = await asyncQuery(query);
    return resp;
};

const stop_task_by_id = async (taskId) => {
    return update_task_state(taskId, config.DBStateStoppedCode);
}

// ----------------------------------   inner use ================  
const update_task_state = async (taskId, state) => {
    var query = 'UPDATE ' + config.DBTaskTabName +
        ' SET ' +
        config.DBStateColName + ' = ' + state +
        ' WHERE ' + config.DBIdColName + ' = ' + taskId;
    var resp = await asyncQuery(query);
    return resp;
}


const check_fuid_uuid = async (fuid, uuid) => {
    var query = 'SELECT * FROM ' +
        config.DBTaskTabName +
        ' WHERE fuid = ' +
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
exports.get_task_state_by_uuid = get_task_state_by_uuid;
exports.get_task_state_by_fuid = get_task_state_by_fuid;
exports.init = init;