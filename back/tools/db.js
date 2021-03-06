const config = require('../config.js');
const mariadb = require('mariadb');
const { logger } = require('./logger.js');


var gHost;
var gPort;
var gUser;
var gPass;
var gDatabase;

// tool fuction 
const make_timestamp_for_mysql = (ts) => {
    var date = new Date();
    date.setTime(ts);
    var yyyy = date.getFullYear();
    var mm = date.getMonth() + 1;
    var dd = date.getDate();
    var hh = date.getHours();
    var min = date.getMinutes();
    var ss = date.getSeconds();

    var mysqlDateTime = yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + min + ':' + ss;

    return mysqlDateTime;
};

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
        logger.info('db resp : ' + JSON.stringify(resp));

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
        '"' + tuid + '"' + ',' +
        '"' + uuid + '"' + ',' +
        '"' + fuid + '"' + ',' +
        '"' + config.DBStateCodeStarted + '"' +
        ')';
    var resp = asyncQuery(query);
    return resp;
};

// ----------------------------------   inner use ================  
const update_task_state = async (tuid, uuid, state) => {
    var query = 'UPDATE ' + config.DBTabNameTask +
        ' SET ' +
        config.DBColNameState + '=' + '"' + state + '"' +
        ' WHERE ' +
        config.DBColNameTuid + '=' + '"' + tuid + '"' +
        ' AND ' +
        config.DBColNameUuid + '=' + '"' + uuid + '"';
    var resp = await asyncQuery(query);
    return resp[0];
}


const get_task_by_uuid = async (uuid) => {
    var query = 'SELECT * FROM ' +
        config.DBTabNameTask +
        ' WHERE ' + config.DBColNameUuid + '=' +
        '"' + uuid + '"';
    var resp = await asyncQuery(query);
    return resp;
};

const stop_task_by_id = async (tuid, uuid) => {
    var resp = await update_task_state(tuid, uuid, config.DBStateCodeStopped);
    return resp;
}




const get_uuid_by_fuid = async (fuid) => {
    var query = 'SELECT * FROM ' +
        config.DBTabNameFiles +
        ' WHERE ' + config.DBColNameFuid + '=' +
        '"' + fuid + '"';
    var resp = await asyncQuery(query);
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


exports.stop_task_by_id = stop_task_by_id;
exports.get_uuid_by_fuid = get_uuid_by_fuid;
exports.get_task_by_uuid = get_task_by_uuid;
exports.add_task = add_task;
exports.init = init;