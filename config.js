const staticRootPath = '/home/pata/nginx/html/static/upload/blend/';

const JobsQueueName = 'brender_render_job_queue3';

const TasksQueueName = 'brender_render_task_queue3'
const TasksQueueName1 = 'brender_render_task_queue31'
const TasksQueueName2 = 'brender_render_task_queue32'
const TasksQueueName3 = 'brender_render_task_queue33'
const TasksQueueName4 = 'brender_render_task_queue34'
const TasksQueueName5 = 'brender_render_task_queue35'

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
const ConWorkersNum = 5;

// -------------------------------------------------------------
// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -

exports.staticRootPath = staticRootPath;

exports.JobsQueueName = JobsQueueName;
exports.TasksQueueName = TasksQueueName;
exports.TasksQueueName1 = TasksQueueName1;
exports.TasksQueueName2 = TasksQueueName2;
exports.TasksQueueName3 = TasksQueueName3;
exports.TasksQueueName4 = TasksQueueName4;
exports.TasksQueueName5 = TasksQueueName5;


exports.OkResp = OkResp;
exports.TaskExistedErrResp = TaskExistedErrResp;
exports.TaskExistedErrCode = TaskExistedErrCode;

exports.StopNotExistTaskErrResp = StopNotExistTaskErrResp;
exports.StopNotExistTaskErrCode = StopNotExistTaskErrCode;

exports.StartExistingTaskErrResp = StartExistingTaskErrResp;
exports.StartExistingTaskErrCode = StartExistingTaskErrCode;


exports.ConWorkersNum = ConWorkersNum;
exports.Seperator = Seperator;
// task data format: 
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