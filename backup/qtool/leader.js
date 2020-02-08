const Queue = require('bull');
const config = require('../config.js');
const logger = require('../logger.js');

var jobQ = new Queue(config.JobsQueueName);


const add_leader = async (taskData) => {
    console.log('leader data : ' + JSON.stringify(taskData));
    var sframe;
    var eframe;
    var frames = taskData.opts.frames;
    if (frames.length == 1) {
        sframe = frames[0];
        eframe = frames[0];
    } else {
        sframe = frames[0];
        eframe = frames[1];

    }

    for (var i = sframe; i <= eframe; i++) {
        var jobData = taskData;
        jobData.opts.frames = [i];
        var ts = new Date().getTime();
        var jobId = jobData.fuid + config.Seperator + i + config.Seperator + ts;
        var job = await jobQ.add(data = jobData, opts = { jobId: jobId });
    }
    return JSON.stringify([jobId, taskData]);

};




exports.add_leader = add_leader;