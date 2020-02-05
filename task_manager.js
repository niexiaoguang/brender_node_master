const config = require('./config.js');

const Queue = require('bull');

var queue = new Queue(config.queueName);


const do_add_job = async (req) => {
    const job = await queue.add({
        foo: 'bar'
    });
    return job.getState();

};

const add_job = async (req, res) => {
    var resp = await do_add_job(req);
    console.log('add job result : ' + resp);
    res.send(resp);
}

exports.add_job = add_job;