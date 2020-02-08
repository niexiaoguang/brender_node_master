const config = require('./config.js');
const logger = require('./logger.js');

const Queue = require('bull');

const JobQ = new Queue(config.jobsQueueName);
const TaskQ = new Queue(config.TasksQueueName)


TaskQ.add({ foo: 'bar' });