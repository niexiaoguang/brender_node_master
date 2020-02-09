const config = require('../config.js');
const logger = require('../logger.js');

const Queue = require('bull');

const JobQ = new Queue(config.jobsQueueName);





const stop_task = async (req) => {

    const fuid = req.body.fuid;
    const uuid = req.body.uuid;

    var jobs = await JobQ.getJobs(types = [fuid]);
    console.log('may stop jobs length : ' + jobs.length);
    if (jobs.length == 0) {
        logger.error(config.StopNotExistTaskErrCode);
        return config.StopNotExistTaskErrResp;

    } else {

        jobs.forEach(async (job) => {
            var state = job.getState();
            if (state == 'waiting') {
                await job.remove();

            }
        });
        return config.OkResp;
    }

};





// TODO

const task_progress = async (req) => {
    var resp = '';
    return resp;
};

const prepare_jobs_data = (rawTaskData) => {
    var sf = rawTaskData.opts.frames[0];
    var ef = rawTaskData.opts.frames[1];
    var step = rawTaskData.opts.step;
    var workerNum = config.ConWorkersNum;
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
    //     name: 'fuid',
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



const start_task = async (req) => {

    const rawTaskData = req.body;
    const uuid = rawTaskData.uuid;
    const fuid = rawTaskData.fuid;

    var mayExistedTasks = await JobQ.getJobs(types = [fuid]);
    console.log('may existed task : ' + JSON.stringify(mayExistedTasks));
    if (mayExistedTasks.length > 0) {
        logger.error(config.StartExistingTaskErrCode);
        return config.StartExistingTaskErrResp;

    } else {
        console.log('start a task');

        var jobsData = prepare_jobs_data(rawTaskData);

        jobsData.forEach(async (jobData) => {

            var ts = new Date().getTime();
            var jobId = fuid + config.Seperator + frame + config.Seperator + ts;
            var opts = { jobId: jobId };
            var name = fuid;
            var res = await JobQ.add(name, jobData, opts);

        });

        return config.OkResp;

    }

};



exports.start_task = start_task;
exports.stop_task = stop_task;
exports.task_progress = task_progress;