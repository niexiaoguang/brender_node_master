const Queue = require('bull');
const config = require('../config.js');

const wQ = new Queue(config.JobsQueueName);

const worker = async (jobData) => {
    console.log(jobData);
    return jobData;

};


wQ.process('*', async (job) => {
    return await worker(job.data);
});