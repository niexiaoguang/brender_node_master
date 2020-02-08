const Queue = require('bull');
const config = require('../config.js');

var queue = new Queue(config.JobsQueueName);

var args = process.argv.slice(2);

console.log(args);

var workerId = args[0];

const worker = async (workerId, jobData) => {
    var tss = new Date().getTime();
    console.log('woker id : ' + workerId);
    console.log('woker data : ' + JSON.stringify(jobData));
    var tse = new Date().getTime();
    return JSON.stringify([workerId, jobData, tse - tss]);
};

queue.process(async (job) => {
    return await worker(workerId, job.data);

});