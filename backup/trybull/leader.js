const Queue = require('bull');

var qWorker = new Queue('workers1');

var tQ = new Queue('task1');
const leader = async (leaderId, jobData) => {
    console.log('leader id : ' + leaderId);
    console.log('leader data : ' + JSON.stringify(jobData));
    var sframe = jobData.sframe;
    var eframe = jobData.eframe;

    for (var i = sframe; i <= eframe; i++) {
        var job = await qWorker.add({ frame: i, leader: leaderId });
        // console.log('leader add job : ' + JSON.stringify(job));
    }
    // return JSON.stringify([leaderId, jobData]);
};


const add_leader = async (fuid) => {



    var job1 = await tQ.add(name = 'a', data = { sframe: 1, eframe: 5, fuid: fuid });

    var job2 = await tQ.add(name = 'b', data = { sframe: 6, eframe: 10, fuid: fuid });

    var job3 = await tQ.add(name = 'c', data = { sframe: 11, eframe: 15, fuid: fuid });



    tQ.process('b', async (job) => {
        return await leader(fuid + '-leader', job.data);

    });

};




exports.add_leader = add_leader;