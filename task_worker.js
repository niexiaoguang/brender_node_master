const Queue = require('bull');
const config = require('./config.js');

const JobQ = new Queue(config.jobsQueueName);
const TaskQ = new Queue(config.TasksQueueName);

var args = process.argv.slice(2);

console.log(args);
const taskWorkerId = args[0];

const taskWorker = async (task) => {
    console.log('task woker : ' + JSON.stringify(task));

    var taskData = task.data;
    var frames = taskData.opts.frames;

    frames.forEach(async (frame) => {
        var data = JSON.parse(JSON.stringify(taskData));
        data.opts.frames = [frame];
        // console.log('job data : ' + JSON.stringify(data));
        var ts = new Date().getTime();
        var jobId = data.fuid + config.Seperator + data.opts.frames[0] + config.Seperator + ts;
        var res = await JobQ.add(data = data, opts = { jobId: jobId });
    });

    return JSON.stringify(jobId);

};

TaskQ.process('*', async (task) => {
    return await taskWorker(task);
});