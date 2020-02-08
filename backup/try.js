const Queue = require('bull');
const config = require('./config.js');

var jobQueue = new Queue(config.JobsQueueName);

const taskQueue = new Queue(config.TasksQueueName);


const test = async () => {

    // const job = await jobQueue.add(name = '1', data = {
    //     foo: 'bar'
    // });

    const job1 = await taskQueue.add(name = '2', data = {
        bar: 'foo'
    });

}

test();