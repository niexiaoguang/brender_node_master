const Queue = require('bull');

var queue = new Queue('workers1');

var args = process.argv.slice(2);

console.log(args);

var workerId = args[0];

const worker = async (workerId, jobData) => {
    console.log('woker id : ' + workerId);
    console.log('woker data : ' + JSON.stringify(jobData));
    return JSON.stringify([workerId, jobData]);
};

queue.process(async (job) => {
    return await worker(workerId, job.data);

});


// console.log(JSON.stringify(queue));
// console.log(queue.count());
// const start = async () => {
//     var q = await new Queue('workers1');
//     q.process(async (job) => {
//         return await worker(workerId, jobData);

//     });

// }
// start();