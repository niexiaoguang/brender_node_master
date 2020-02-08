const Queue = require('bull');

var queue = new Queue('workers1');

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