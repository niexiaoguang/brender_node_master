const Queue = require('bull');
const config = require('../config.js');

const JobQ = new Queue(config.jobsQueueName);


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

JobQ.process('a7fc0c294192af14cc202587920f17b8', 1, async (job) => {
    return await jobWorker(job);

});