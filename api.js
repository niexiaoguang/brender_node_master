const config = require('./config.js');
const DB = require('./tools/db.js');
// const rra = require('recursive-readdir-async');

const TaskManager = require('./task/manager.js');

const logger = require('./log/logger.js');

const start_task = async (reqData) => {
    var fuid = reqData.fuid;
    var uuid = reqData.uuid;
    var checkB = DB.check_fuid_uuid(fuid, uuid);
    if (checkB) {
        return await TaskManager.start_task(reqData);
    } else {
        return config.TaskUserNotMatchErrResp;
    }
}

const stop_task = async (reqData) => {
    var taskId = reqData.taskid;
    var uuid = reqData.uuid;
    return await TaskManager.stop_task(taskId, uuid);
}

const get_task_state_by_fuid = async (fuid) => {
    return await DB.get_task_state_by_fuid(fuid);
}

const get_task_state_by_uuid = async (uuid) => {
    return await DB.get_task_state_by_uuid(uuid);
}

const stop_task_by_id = async (reqData) => {
    var taskId = reqData.taskid;
    return await DB.stop_stak_by_id(taskId); // need set res by inner resp TODO
}
// --------------------------------------------------------------------


exports.start_task = start_task;
exports.stop_task = stop_task;
exports.get_task_state_by_fuid = get_task_state_by_fuid;
exports.get_task_state_by_uuid = get_task_state_by_uuid;
exports.stop_task_by_id = stop_task_by_id;