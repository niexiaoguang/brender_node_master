const config = require('../config.js');
const logger = require('../log/logger.js');
const fs = require('fs');

const Queue = require('bull');

var JobQ;

const DB = require('../tools/db.js');

const init_queue_name = (name) => {
    JobQ = new Queue(name);
}



const prepare_jobs_data = (rawTaskData) => {
    var sf = rawTaskData.opts.frames[0];
    var ef = rawTaskData.opts.frames[1];
    var step = rawTaskData.opts.step;
    var workernum = config.ConWorkersNum;
    var acc = sf;
    var res = [];
    var res1 = [];
    while (acc <= ef) {
        if (res.length < workernum) {
            res.push(acc)
            acc += step;

        } else {
            break;
        }

    };

    // {
    //     name: 'uuid',
    //     opts: { jobId: 'fuid' + ts },
    //     data: {
    //         uuid: 'uuid',
    //         fuid: 'fuid',
    //         job: {
    //             workernum: 5, // number of workers at a time 
    //             frame: 3, // current rendering frame

    //         },
    //         opts: {
    //             resolution: [1920, 1080],
    //             engine: 'CYCLES' / 'BLENDER_EEVEE',
    //             samples: 200,
    //             frames: [1, 250],
    //             step: 1,

    //         }
    //     }
    // }
    for (var i = 0; i < res.length; i++) {
        var data = JSON.parse(JSON.stringify(rawTaskData));
        data.job = {};
        data.job.workernum = config.ConWorkersNum; // TODO  fixed value for dev
        data.job.frame = res[i];
        res1.push(data);
    }

    console.log('prepared tasks data : ' + JSON.stringify(res1));
    return res1;
};


// ---------------------------------- 
const start_task = async (data) => {

    const rawTaskData = data;
    const uuid = rawTaskData.uuid;
    const fuid = rawTaskData.fuid;


    var jobsData = prepare_jobs_data(rawTaskData);
    var ts = new Date().getTime();
    var taskId = fuid + config.Seperator + ts;
    var taskFolderPath = config.RootPath + uuid + '/' + fuid + '/' + ts;

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    } else {
        logger.error(config.TaskExistedErrCode);
        return config.TaskExistedErrResp;
    }

    var configFilePath = taskFolderPath + '/config.js';

    // save config data into file

    fs.writeFile("configFilePath", JSON.stringify(rawTaskData, null, 4), (err) => {
        if (err) {
            logger.error('cant save config file');

            return config.TaskConfigFileSaveErrorCode;
        };
        logger.info('config file saved');
    });
    // update db action
    var dbResp = await DB.add_task(taskId, uuid);


    if (dbResp !== config.DBErrCode) {
        // create folder for saving rendered image


        jobsData.forEach(async (jobData) => {

            var ts = new Date().getTime();
            var frame = jobData.job.frame;
            var jobId = fuid + config.Seperator + frame + config.Seperator + ts;
            var opts = { jobId: jobId };
            var name = taskId;
            var res = await JobQ.add(name, jobData, opts);

        });
        return config.OkResp;

    } else {

        return config.DBErrResp;
    }


};


exports.start_task = start_task;
exports.init_queue_name = init_queue_name;