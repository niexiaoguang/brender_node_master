const config = require('./config.js');

const Queue = require('bull');

var queue = new Queue(config.queueName);



const add_job = async (req) => {
    const uuid = req.body.uuid;
    const fuid = req.body.fuid;
    const q = new Queue(uuid);
    // check if fuid task already in uuid queue =======
    var existed = await q.getJob(fuid);
    // console.log('existed : ' + existed);
    // var num = await q.count();
    // console.log('queue jobs num: ' + num);

    // existed 
    if (existed != null) {
        return config.JobExistedErrorResponse;
    }
    // add new fuid job into uuid queue
    else {
        var opts = { jobId: fuid };
        var job = await q.add(data = { "fuid": fuid }, opts = opts);
        var resp = await job.getState();
        return resp;
    }


}


exports.add_job = add_job;