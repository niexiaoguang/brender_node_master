const Queue = require('bull');

var queue = new Queue('testemptyclose');


setTimeout(function() {
    queue.close()
}, 3000);

// queue.close();