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


const check_fuid_uuid = async (fuid, uuid) => {
    var query = 'SELECT * FROM ' +
        config.DBTaskTabName +
        ' WHERE fuid = ' +
        fuid;
    var resp = await asyncQuery(query);
    return resp.uuid == uuid;
};

const query_all_task = async (uuid) => {
    const query = 'SELECT * FROM ' +
        config.DBTaskTabName +
        ' WHERE uuid = ' +
        uuid;

    var resp = await asyncQuery(query);

    logger.info(resp);

    return resp;

};

const update_task_state = async (fuid, code) => {
    var query = 'UPDATE ' + config.DBTaskTabName +
        ' SET ' + config.DBActionColName + ' = ' +
        code +
        ' WHERE ' + config.DBFuidColName +
        ' = ' +
        fuid;


    var resp = await asyncQuery(query);

    logger.info(resp);
    return resp;


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


exports.query_all_task = query_all_task;
exports.check_fuid_uuid = check_fuid_uuid;
exports.init = init;