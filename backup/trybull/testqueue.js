const Queue = require('bull');

var queue = new Queue('testemptyclose');


const info = async () => {

    var num = await queue.count();
    console.log('q num : ' + num + ',ts :' + new Date().getTime());
}

setInterval(info, 2000);