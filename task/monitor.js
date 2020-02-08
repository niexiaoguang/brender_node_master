const Queue = require('bull');
const config = require('../config.js');

var jobqueue = new Queue(config.JobsQueueName);
var taskqueue = new Queue(config.TasksQueueName);
const info = async () => {

    var jnum = await jobqueue.count();
    var tnum = await taskqueue.count();
    console.log('job num : ' + jnum +
        ',task num : ' + tnum +
        ',ts :' + new Date().getTime());

}

setInterval(info, 1000);