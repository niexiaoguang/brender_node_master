const config = require('../config.js');
const logger = require('../tools/logger.js');

const Queue = require('bull');

const JobQ = new Queue('brender_render_job_queue8');

const DB = require('../tools/db.js');

const stop_task = async (fuid, uuid) => {


    var jobs = await JobQ.getJobs(types = [fuid]);
    console.log('may stop jobs length : ' + jobs.length);
    if (jobs.length == 0) {
        logger.log('error', config.StopNotExistTaskErrCode, new Error(req));
        return config.StopNotExistTaskErrResp;

    } else {

        jobs.forEach(async (job) => {
            var state = job.getState();
            if (state == 'waiting' || state == 'acitve') {
                await job.remove();

            }
        });
        return config.OkResp;
    }

};

// ====================  internal use ========== 
const do_stop_task = async (fuid) => {

    var jobs = await JobQ.getJobs(types = [fuid]);


    jobs.forEach(async (job) => {
        var state = job.getState();
        if (state == 'waiting' || state == 'acitve') {
            await job.remove();

        }
    });

}


// TODO

const task_progress = async (req) => {
    var resp = '';
    return resp;
};

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



const start_task = async (data) => {

    const rawTaskData = data;
    const uuid = rawTaskData.uuid;
    const fuid = rawTaskData.fuid;

    // get all running task by uuid 
    // and check if fuid existed

    var mayExistedTasks = await JobQ.getJobs(types = [fuid]);
    console.log('may existed task : ' + JSON.stringify(mayExistedTasks));

    if (mayExistedTasks.length > 0) {
        logger.log('error', config.StartExistingTaskErrCode, new Error(req));

        return config.StartExistingTaskErrResp;
    };


    console.log('start a task');

    var jobsData = prepare_jobs_data(rawTaskData);

    jobsData.forEach(async (jobData) => {
        // console.log(jobData);
        var ts = new Date().getTime();
        var frame = jobData.job.frame;
        var jobId = fuid + config.Seperator + frame + config.Seperator + ts;
        var opts = { jobId: jobId };
        var name = uuid;
        var res = await JobQ.add(name, jobData, opts);
        // console.log(res);
    });

    // update db action
    var dbResp = await DB.update_task_state(fuid, config.TaskStateCodeStarted);


    if (dbResp !== config.DBErrCode) {
        return config.OkResp;

    } else {
        await do_stop_task(fuid);
        return config.DBErrResp;
    }


};

const get_running_task = async (req) => {
    var uuid = req.body.uuid;
    var jobs = await JobQ.getJobs(types = [uuid]);
    var resp = [];
    for (var i = 0; i < jobs.length; i++) {
        resp.push(jobs[i].data.fuid);
    }
    resp = Array.from(new Set(resp)); // remove repeated
    res.send(JSON.stringify(resp));
}

exports.start_task = start_task;
exports.stop_task = stop_task;
exports.task_progress = task_progress;
exports.get_running_task = get_running_task;