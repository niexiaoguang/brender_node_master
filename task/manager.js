const config = require('../config.js');
const logger = require('../tools/logger.js');

const Queue = require('bull');

var JobQ;

const DB = require('../tools/db.js');

const init_queue_name = (name) => {
    JobQ = new Queue(name);
}



const prepare_jobs_data = (rawTaskData, tuid, ts) => {
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
    //     data: {
    //         uuid: 'uuid',
    //         fuid: 'fuid',
    //         job: {
    //             workernum: 2, // number of workers at a time 
    //             frame: 3, // current rendering frame
    //             tuid: 'tuid',
    //             ts:'ts',
    //             script:'prepare.py',
    //             jobid: 'tuid' + frame,
    //         },
    //          opts: { engine: 'engine', 
    //             scene: 'Scene', 
    //             frames: [1, 250], 
    //             step: 1, 
    //             resolution: [1920, 1080], 
    //             samples: 64 }
    //         }
    //     }
    // }
    for (var i = 0; i < res.length; i++) {
        var data = JSON.parse(JSON.stringify(rawTaskData));
        data.job = {};
        data.job.workernum = config.ConWorkersNum; // TODO  fixed value for dev
        data.job.tuid = tuid;
        data.job.ts = ts;
        data.job.script = 'prepare.py';
        data.job.frame = res[i];
        data.job.jobid = tuid + res[i];
        res1.push(data);
    }

    console.log('prepared tasks data : ' + JSON.stringify(res1));
    return res1;
};


// ---------------------------------- 

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

const start_task = async (data) => {

    const rawTaskData = data;
    const uuid = rawTaskData.uuid;
    const fuid = rawTaskData.fuid;



    var ts = new Date().getTime();
    var tuid = fuid + config.Seperator + ts;

    var jobsData = prepare_jobs_data(rawTaskData, tuid, ts);

    var taskFolderPath = config.RootPath + uuid + '/' + fuid + '/' + ts;

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    } else {
        logger.error(config.TaskExistedErrCode);
        return config.TaskExistedErrResp;
    }

    var configFilePath = taskFolderPath + '/config.json';

    // save config data into file

    fs.writeFile(configFilePath, JSON.stringify(rawTaskData, null, 4), (err) => {
        if (err) {
            logger.error('cant save config file');

            return config.TaskConfigFileSaveErrorCode;
        };
        logger.info('config file saved');
    });

    // update db action
    var dbResp = await DB.add_task(tuid, uuid, fuid);


    if (dbResp !== config.DBErrCode) {
        jobsData.forEach(async (jobData) => {

            // {
            //     data: {
            //         uuid: 'uuid',
            //         fuid: 'fuid',
            //         job: {
            //             workernum: 2, // number of workers at a time 
            //             frame: 3, // current rendering frame
            //             tuid: 'tuid',
            //             ts:'ts',
            //             script:'prepare.py',
            //             jobid: 'tuid' + frame,
            //         },
            //          opts: { engine: 'engine', 
            //             scene: 'Scene', 
            //             frames: [1, 250], 
            //             step: 1, 
            //             resolution: [1920, 1080], 
            //             samples: 64 }
            //         }
            //     }
            // }
            var jobId = jobData.job.jobid;
            var opts = { jobId: jobId };
            var name = tuid;
            var res = await JobQ.add(name, jobData, opts);

        });
        return config.OkResp;

    } else {

        return config.DBErrResp;
    }


};


exports.start_task = start_task;
exports.init_queue_name = init_queue_name;