const Queue = require('bull');


const config = require('../config.js');

const JobQ = new Queue(config.jobsQueueName);
const TaskQ = new Queue(config.TasksQueueName);


const TaskQ1 = new Queue(config.jobsQueueName1);
const TaskQ2 = new Queue(config.jobsQueueName2);
const TaskQ3 = new Queue(config.jobsQueueName3);
const TaskQ4 = new Queue(config.jobsQueueName4);
const TaskQ5 = new Queue(config.jobsQueueName5);

var args = process.argv.slice(2);

console.log(args);
const taskWorkerId = args[0];

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}


const taskWorker = async (task) => {
    // console.log('task woker : ' + JSON.stringify(task));

    var taskData = task.data;
    var frames = taskData.opts.frames;
    console.log('job frame : ' + frames);
    console.log('job start');
    // await sleep(3000);
    console.log('job end');
    // frames.forEach(async (frame) => {
    //     console.log('job frame : ' + frame);
    //     var data = JSON.parse(JSON.stringify(taskData));
    //     data.opts.frames = [frame];
    //     console.log('job data : ' + JSON.stringify(data));
    //     var ts = new Date().getTime();
    //     var jobId = data.fuid + config.Seperator + data.opts.frames[0] + config.Seperator + ts;
    //     var res = await JobQ.add(data = data, opts = { jobId: jobId });
    // });

    return JSON.stringify(taskData);

};



TaskQ1.process('*', 1, async (task) => {
    return await taskWorker(task);
});

TaskQ2.process('*', 2, async (task) => {
    return await taskWorker(task);
});
TaskQ3.process('*', 3, async (task) => {
    return await taskWorker(task);
});
TaskQ4.process('*', 4, async (task) => {
    return await taskWorker(task);
});
TaskQ5.process('*', 5, async (task) => {
    return await taskWorker(task);
});