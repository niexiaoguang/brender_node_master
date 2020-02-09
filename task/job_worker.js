const Queue = require('bull');
const config = require('../config.js');

const JobQ = new Queue(config.jobsQueueName);
const TaskQ = new Queue(config.TasksQueueName);


var args = process.argv.slice(2);

console.log(args);

const jobWorkerId = args[0];

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

const jobWorker = async (job) => {
    var jobData = job.data;
    var tss = new Date().getTime();
    console.log('woker data : ' + JSON.stringify(jobData));
    console.log('job start');
    await sleep(3000);
    console.log('job end');
    var tse = new Date().getTime();
    return JSON.stringify([jobData, tse - tss]);
};

JobQ.process('*', 1, async (job) => {
    return await jobWorker(job);

});