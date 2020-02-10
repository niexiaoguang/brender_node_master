const config = require('./config.js');

const rra = require('recursive-readdir-async');

const TaskManager = require('./task/manager.js');

const logger = require('./tools/logger.js');

const start_task = async (req) => {
    return await TaskManager.start_task(req);
}

const stop_task = async (req) => {
    return await TaskManager.stop_task(req);
}

const task_progress = async (req) => {
    return await TaskManager.task_progress(req);
}
// --------------------------------------------------------------------
const options = {
    mode: rra.LIST,
    recursive: true,
    stats: true,
    ignoreFolders: true,
    extensions: false,
    deep: false,
    realPath: true,
    normalizePath: true,
    include: [],
    exclude: [],
    readContent: false,
    encoding: 'utf-8'
}
const do_get_projects = async (req) => {

    var uuid = req.query.uuid;
    var start = req.query.start;
    var end = req.query.end;

    var resp = [];
    // body...
    const list = await rra.list(config.staticRootPath + uuid + '/', options, function(obj, index, total) {

        // console.log(`${index} of ${total} ${obj.path}`);

        // if (obj.name == "folder2")
        // return true; // return true to delete item

    });

    for (var i = list.length - 1; i >= 0; i--) {
        if (list[i].name.indexOf('.blend') > -1) {
            var item = {};
            item.name = list[i].name;
            item.path = list[i].path;
            item.size = list[i].stats.size;
            item.birthtimeMs = list[i].stats.birthtimeMs;
            resp.push(item);

        }
    }

    return JSON.stringify(resp);

}

const get_projects = async (req) => {
    return await do_get_projects(req);
}



exports.start_task = start_task;
exports.stop_task = stop_task;
exports.task_progress = task_progress;

exports.get_projects = get_projects;