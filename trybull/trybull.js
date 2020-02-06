const Queue = require('bull');

var queue = new Queue('try');


var args = process.argv.slice(2);

var Leader = require('./leader.js');

var fuid = args[0];
var sframe = args[1];
var eframe = args[2];
var renderNum = args[3];

// const joblist = [{ foo: 'bar10' }, { foo: 'bar2' }, { foo: 'bar3' }];
// for (var i = joblist.length - 1; i >= 0; i--) {
//     queue.add(joblist[i]);

// }

const test = async (fuid) => {
    return await Leader.add_leader(fuid);
};

const test1 = async () => {
    await test(fuid);
};



test1();

// const showQueue = async () => {
//     var info = await queue.count();
//     // console.log(info);
//     return info;
// }


// const getCount = async () => {
//     console.log('getcount : ' + await showQueue());
// }

// getCount();