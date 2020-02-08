const Queue = require('bull');

var queue = new Queue('testemptyclose');

queue.empty();