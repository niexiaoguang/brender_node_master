const config = require('./config.js');

const Queue = require('bull');

var queue = new Queue(config.queueName);


const add_job = async (data, req, res) => {
    const job = await queue.add({
        foo: 'bar'
    });

    // console.log(data);
    // console.log(job.getState());

    // res.send(job.getState());
    res.send('ok from task manager');
};


exports.add_job = add_job;