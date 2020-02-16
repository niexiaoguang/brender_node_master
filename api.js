const config = require('./config.js');
const DB = require('./tools/db.js');
// const rra = require('recursive-readdir-async');

const TaskManager = require('./task/manager.js');

const logger = require('./tools/logger.js');


// =========================  data format +++++++++++++++++++++++

// {
//     uuid: 'uuid',
//     fuid: 'fuid',
//     opts: { engine: 'engine', 
//             scene: 'Scene', 
//             frames: [1, 250], 
//             step: 1, 
//             resolution: [1920, 1080], 
//             samples: 64 }
// }
const check_fuid_uuid = async (fuid, uuid) => {
    var dbresp = await DB.get_uuid_by_fuid(fuid);
    return dbresp[0].uuid == uuid;
}

const start_task = async (reqData) => {
    var fuid = reqData.fuid;
    var uuid = reqData.uuid;
    var checkB = await check_fuid_uuid(fuid, uuid);
    if (checkB) {
        var resp = await TaskManager.start_task(reqData);
        return resp;
    } else {
        return config.TaskUserNotMatchErrResp;
    }
}

// {
//     uuid: 'uuid',
//     tuid: 'tuid',
// }

const stop_task = async (reqData) => {
    var tuid = reqData.tuid;
    var uuid = reqData.uuid;
    return await DB.stop_task_by_id(tuid, uuid);
}


const get_task_by_uuid = async (uuid) => {
    return await DB.get_task_by_uuid(uuid);
}

// --------------------------------------------------------------------


exports.start_task = start_task;
exports.stop_task = stop_task;
exports.get_task_by_uuid = get_task_by_uuid;