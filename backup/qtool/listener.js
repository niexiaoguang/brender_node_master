const Queue = require('bull');

var queue = new Queue('workers1');

var args = process.argv.slice(2);

console.log(args);

queue.on('global:completed', (job, result) => {
    console.log(`Job completed with result ${JSON.parse(result)}`);
})