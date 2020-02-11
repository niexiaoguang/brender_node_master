const config = require('./config.js');
const DB = require('./tools/db.js');
// const rra = require('recursive-readdir-async');

const TaskManager = require('./task/manager.js');

const logger = require('./tools/logger.js');

const start_task = async (reqData) => {
    var fuid = reqData.fuid;
    var uuid = reqData.uuid;
    var checkB = DB.check_fuid_uuid(fuid, uuid);
    if (checkB) {
        return await TaskManager.start_task(req);
    } else {
        return config.TaskUserNotMatchErrResp;
    }
}

const stop_task = async (req) => {
    var fuid = req.body.fuid;
    var uuid = req.body.uuid;
    return await TaskManager.stop_task(fuid, uuid);
}

const task_progress = async (req) => {
    return await TaskManager.task_progress(req);
}
// --------------------------------------------------------------------

const get_all_task = async (req) => {
    var uuid = req.query.uuid;
    var resp = DB.query_all_task(uuid);
    return JSON.stringify({ status: "ok", info: resp }); // TODO get tasks by db
}

const get_running_task = async (req) => {
    return await TaskManager.get_running_task(req);
}

exports.start_task = start_task;
exports.stop_task = stop_task;
exports.task_progress = task_progress;

exports.get_all_task = get_all_task;
exports.get_running_task = get_running_task;