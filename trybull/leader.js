const Queue = require('bull');

// var qWorker = new Queue('workers1');


const leader = async (leaderId, jobData) => {
    console.log('leader id : ' + leaderId);
    console.log('leader data : ' + JSON.stringify(jobData));
    var sframe = jobData.sframe;
    var eframe = jobData.eframe;
    var qWorker = await new Queue('workers1');

    for (var i = sframe; i <= eframe; i++) {
        var job = await qWorker.add({ frame: i, leader: leaderId });
        // console.log('leader add job : ' + JSON.stringify(job));
    }
    // return JSON.stringify([leaderId, jobData]);
};


const add_leader = async (fuid) => {
    var q = await new Queue(fuid);
    if (q.count() > 0) {
        console.log('error already existed queue : ' + fuid);
    } else {


        var job1 = await q.add({ sframe: 1, eframe: 5, fuid: fuid });

        var job2 = await q.add({ sframe: 6, eframe: 10, fuid: fuid });

        var job3 = await q.add({ sframe: 11, eframe: 15, fuid: fuid });



        q.process(async (job) => {
            return await leader(fuid + '-leader', job.data);

        })
    }

}



exports.add_leader = add_leader;