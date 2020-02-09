const Queue = require('bull');

const wQ = new Queue('tryListenerQ');


const mayAddNextJobs = async (job) => {
    console.log('global completed : ', JSON.stringify(jobId));
    var job = await wQ.getJob(jobId);
    console.log(JSON.stringify(job));
    var data = job.data;

    var sframe = data.opts.frames[0];
    var eframe = data.opts.frames[1];
    var frame = data.job.frame;
    var workernum = data.job.workernum;
    var step = data.opts.step;

    var fuid = data.fuid;
    var nextFrame = frame + workernum * step;
    if (nextFrame <= eframe) {
        data.job.frame = nextFrame;
        var ts = new Date().getTime();
        var jobId = fuid + config.Seperator + nextFrame + config.Seperator + ts;
        var name = fuid;
        var opts = { jobId: jobId };

        wQ.add(name, data, opts);
    }
};

const updateDB = async (job) => {
    console.log('updateDB for job : ' + JSON.stringify(job));
};

const cleanJob = async (job) => {
    console.log('clean for job : ' + JSON.stringify(job));

};

wQ.on('global:completed', async (jobId) => {

    var job = wQ.getJob(jobId);
    await mayAddNextJobs(job);
    await updateDB(job);
    await cleanJob(job);

});