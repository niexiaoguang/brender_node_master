const config = require('./config.js');
const DB = require('./tools/db.js');
// const rra = require('recursive-readdir-async');

const TaskManager = require('./task/manager.js');

const logger = require('./tools/logger.js');

const start_task = async (reqData) => {
    var fuid = reqData.fuid;
    var uuid = reqData.uuid;
    var checkB = await DB.check_fuid_uuid(fuid, uuid);
    if (checkB) {
        var resp = await TaskManager.start_task(reqData);
        return resp;
    } else {
        return config.TaskUserNotMatchErrResp;
    }
}

const stop_task = async (reqData) => {
    var taskId = reqData.taskid;
    var uuid = reqData.uuid;
    return await DB.stop_task_by_id(taskId, uuid);
}


const get_task_by_uuid = async (uuid) => {
    return await DB.get_task_by_uuid(uuid);
}

// --------------------------------------------------------------------


exports.start_task = start_task;
exports.stop_task = stop_task;
exports.get_task_by_uuid = get_task_by_uuid;