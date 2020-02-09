const staticRootPath = '/home/pata/nginx/html/static/upload/blend/';

const JobsQueueName = 'brender_render_job_queue8';

// -------------------------------------------------------------


const OkResp = JSON.stringify({
    status: 'ok'
});
// error response 
const TaskExistedErrResp = JSON.stringify({
    status: "error",
    info: "fuid render task already existed"
});
const TaskExistedErrCode = 4000;


const StopNotExistTaskErrResp = JSON.stringify({
    status: "error",
    info: "task not existed or finished"
});
const StopNotExistTaskErrCode = 4001;


const StartExistingTaskErrResp = JSON.stringify({
    status: "error",
    info: "task already existed"
});
const StartExistingTaskErrCode = 4002;


const Seperator = '-';

// most numbbet of worker at a time for a task , fixed only dev  TODO 
const ConWorkersNum = 2;

// -------------------------------------------------------------
// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -

exports.staticRootPath = staticRootPath;

exports.JobsQueueName = JobsQueueName;

exports.OkResp = OkResp;
exports.TaskExistedErrResp = TaskExistedErrResp;
exports.TaskExistedErrCode = TaskExistedErrCode;

exports.StopNotExistTaskErrResp = StopNotExistTaskErrResp;
exports.StopNotExistTaskErrCode = StopNotExistTaskErrCode;

exports.StartExistingTaskErrResp = StartExistingTaskErrResp;
exports.StartExistingTaskErrCode = StartExistingTaskErrCode;


exports.ConWorkersNum = ConWorkersNum;
exports.Seperator = Seperator;
// task request data format --------------------------- 
// {
//     uuid: 'uuid',
//     fuid: 'fuid',
//     opts: {
//         resolution: [1920, 1080],
//         engine: 'CYCLES' / 'BLENDER_EEVEE',
//         samples: 200,
//         frames: [1, 250],
// 		   step:1
//     }
// }




// task job data format --------------------------------

// {
//     name: 'fuid',
//     opts: { jobId: 'fuid' + 'frame' + ts },
//     data: {
//         uuid: 'uuid',
//         fuid: 'fuid',
//         job: {
//             workernum: 5, // number of workers at a time 
//             frame: 3, // current rendering frame

//         },
//         opts: {
//             resolution: [1920, 1080],
//             engine: 'CYCLES' / 'BLENDER_EEVEE',
//             samples: 200,
//             frames: [1, 250],
//             step: 1,

//         }
//     }
// }