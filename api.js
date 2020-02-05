const config = require('./config.js');

const rra = require('recursive-readdir-async');

const TaskManager = require('./task_manager.js');

const add_job = async (req) => {
    return await TaskManager.add_job(req);
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



exports.add_job = add_job;

exports.get_projects = get_projects;