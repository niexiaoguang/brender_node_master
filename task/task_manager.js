const config = require('../config.js');
const logger = require('../logger.js');

const Queue = require('bull');

const JobQ = new Queue(config.jobsQueueName);
const TaskQ = new Queue(config.TasksQueueName);

const TaskQ1 = new Queue(config.jobsQueueName1);
const TaskQ2 = new Queue(config.jobsQueueName2);
const TaskQ3 = new Queue(config.jobsQueueName3);
const TaskQ4 = new Queue(config.jobsQueueName4);
const TaskQ5 = new Queue(config.jobsQueueName5);


const stop_task_job = async (task) => {

    const data = task.data;
    var fuid = data.fuid;
    var sf = data.opts.frames[0];
    var ef = data.opts.frames[1];
    var step = data.opts.step;
    var acc = sf;
    while (acc <= ef) {

        const jobId = fuid + config.seperator + acc;
        var job = await JobQ.getJob(jobId);
        if (!job) {
            var state = await job.getState();
            // keep running job on
            if (state != 'active') {
                job.remove();
            }
        }
        acc += step;
    }



};


const stop_task = async (req) => {

    const fuid = req.body.fuid;
    const uuid = req.body.uuid;

    var tasks = await TaskQ.getJobs(types = [fuid]);
    console.log('may stop tasks length : ' + tasks.length);
    if (tasks.length == 0) {
        logger.error(config.StopNotExistTaskErrCode);
        return config.StopNotExistTaskErrResp;

    } else {

        tasks.forEach(async (task) => {
            stop_task_job(task);
            await task.remove();
        });
        return config.OkResp;
    }

};





// TODO

const task_progress = async (req) => {
    var resp = '';
    return resp;
};

const prepare_subtasks_data = (rawTaskData) => {
    var sf = rawTaskData.opts.frames[0];
    var ef = rawTaskData.opts.frames[1];
    var step = rawTaskData.opts.step;
    var sn = config.ConWorkersNum;
    var acc = sf;
    var res = [];
    var res1 = [];
    var res2 = [];
    while (acc <= ef) {
        res.push(acc);
        if (res.length == sn) {
            res1.push(res);
            res = [];
        }
        acc += step;

    };

    if (res.length > 0) {
        res1.push(res);
    }

    for (var i = 0; i < res1.length; i++) {
        var data = JSON.parse(JSON.stringify(rawTaskData));
        data.opts.frames = res1[i];
        res2.push(data);
    }
    console.log('prepared tasks data : ' + JSON.stringify(res2));
    console.log('length is ' + res2.length);
    return res2;
};

const prepare_subtasks_data1 = (rawTaskData) => {
    var sf = rawTaskData.opts.frames[0];
    var ef = rawTaskData.opts.frames[1];
    var step = rawTaskData.opts.step;
    var acc = sf;
    var res1 = [];
    var res2 = [];
    while (acc <= ef) {
        res1.push(acc);
        acc += step;

    };

    for (var i = 0; i < res1.length; i++) {
        var data = JSON.parse(JSON.stringify(rawTaskData));
        data.opts.frames = res1[i];
        res2.push(data);
    }
    console.log('prepared tasks data : ' + JSON.stringify(res2));
    console.log('length is ' + res2.length);
    return res2;
};



const start_task = async (req) => {

    const rawTaskData = req.body;
    const uuid = rawTaskData.uuid;
    const fuid = rawTaskData.fuid;

    var mayExistedTasks = await TaskQ.getJobs(types = [fuid]);
    console.log('may existed task : ' + JSON.stringify(mayExistedTasks));
    if (mayExistedTasks.length > 0) {
        logger.error(config.StartExistingTaskErrCode);
        return config.StartExistingTaskErrResp;

    } else {
        console.log('start a task');

        var tasksData = prepare_subtasks_data1(rawTaskData);

        // JobQ.process(fuid, 1, async (job) => {
        //     return await jobWorker(job);

        // });

        tasksData.forEach(async (taskData) => {
            var taskId = fuid + config.Seperator + Math.random();

            var res = await TaskQ1.add(name = fuid, data = taskData, opts = { jobId: taskId });
            // var res = await JobQ.add(name = fuid, data = taskData, opts = { jobId: taskId });
            // console.log('task res : ' + JSON.stringify(res));

        });

        return config.OkResp;

    }

};



exports.start_task = start_task;
exports.stop_task = stop_task;
exports.task_progress = task_progress;