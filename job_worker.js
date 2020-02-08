const Queue = require('bull');
const config = require('./config.js');

const JobQ = new Queue(config.jobsQueueName);
const TaskQ = new Queue(config.TasksQueueName);


var args = process.argv.slice(2);

console.log(args);

const jobWorkerId = args[0];

const jobWorker = async (job) => {
    var jobData = job.data;
    var tss = new Date().getTime();
    console.log('woker id : ' + jobWorkerId);
    console.log('woker data : ' + JSON.stringify(jobData));
    var tse = new Date().getTime();
    return JSON.stringify([jobWorkerId, jobData, tse - tss]);
};

JobQ.process('*', async (job) => {
    return await jobWorker(job);

});