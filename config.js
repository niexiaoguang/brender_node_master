<<<<<<< HEAD
const staticRootPath = '/home/pata/nginx/html/static/upload/blend/';

const JobsQueueName = 'brender_render_job_queue3';

const TasksQueueName = 'brender_render_task_queue3'
const TasksQueueName1 = 'brender_render_task_queue31'
const TasksQueueName2 = 'brender_render_task_queue32'
const TasksQueueName3 = 'brender_render_task_queue33'
const TasksQueueName4 = 'brender_render_task_queue34'
const TasksQueueName5 = 'brender_render_task_queue35'

// -------------------------------------------------------------


=======
>>>>>>> 0.3.1
const OkResp = JSON.stringify({
    status: 'ok'
});
// error response 

const AuthCheckErrResp = JSON.stringify({
    status: "error",
    info: "auth check failed"
});
const AuthCheckErrCode = 4003;

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


const TaskUserNotMatchErrCode = 4004;
const TaskUserNotMatchErrResp = JSON.stringify({
    status: "error",
    info: "task user not match"
});


const DBErrCode = 4100;
const DBErrResp = 'db error';

// ----------------------------------------------------
// ----------------------------------------------------
const DBTabNameTask = 'tuid';
const DBTabNameJobs = 'jobs';
const DBTabNameFiles = 'fuid';

const DBColNameFuid = 'fuid';
const DBColNameUuid = 'uuid';
const DBColNameTuid = 'tuid';
const DBColNameStart = 'start';
const DBColNameEnd = 'end';
const DBColNameState = 'state';
const DBColNameUpdateTs = 'update_ts';
const DBColNameDevice = 'device';
const DBColNameId = 'id';
const DBColNameSuid = 'suid';

const DBStateCodeStopped = 'stp';
const DBStateCodeStarted = 'sta';
const DBStateCodeFinished = 'fin';
const DBStateCodeFailed = 'fai';




const Seperator = '-';

// most numbbet of worker at a time for a task , fixed only dev  TODO 
const ConWorkersNum = 2;


// -------------------------------------------------------------

<<<<<<< HEAD
exports.JobsQueueName = JobsQueueName;
exports.TasksQueueName = TasksQueueName;
exports.TasksQueueName1 = TasksQueueName1;
exports.TasksQueueName2 = TasksQueueName2;
exports.TasksQueueName3 = TasksQueueName3;
exports.TasksQueueName4 = TasksQueueName4;
exports.TasksQueueName5 = TasksQueueName5;

=======
>>>>>>> 0.3.1

exports.OkResp = OkResp;
exports.TaskExistedErrResp = TaskExistedErrResp;
exports.TaskExistedErrCode = TaskExistedErrCode;

exports.StopNotExistTaskErrResp = StopNotExistTaskErrResp;
exports.StopNotExistTaskErrCode = StopNotExistTaskErrCode;

exports.StartExistingTaskErrResp = StartExistingTaskErrResp;
exports.StartExistingTaskErrCode = StartExistingTaskErrCode;

exports.TaskUserNotMatchErrResp = TaskUserNotMatchErrResp;
exports.TaskUserNotMatchErrCode = TaskUserNotMatchErrCode;

exports.DBErrCode = DBErrCode;
exports.DBErrResp = DBErrResp;




exports.ConWorkersNum = ConWorkersNum;
exports.Seperator = Seperator;





exports.DBHost = DBHost;
exports.DBUser = DBUser;




exports.DBTabNameTask = DBTabNameTask;
exports.DBTabNameJobs = DBTabNameJobs;
exports.DBTabNameFiles = DBTabNameFiles;

exports.DBColNameFuid = DBColNameFuid;
exports.DBColNameUuid = DBColNameUuid;
exports.DBColNameTuid = DBColNameTuid;
exports.DBColNameStart = DBColNameStart;
exports.DBColNameEnd = DBColNameEnd;
exports.DBColNameState = DBColNameState;
exports.DBColNameUpdateTs = DBColNameUpdateTs;
exports.DBColNameDevice = DBColNameDevice;
exports.DBColNameId = DBColNameId;
exports.DBColNameSuid = DBColNameSuid;

exports.DBStateCodeStopped = DBStateCodeStopped;
exports.DBStateCodeStarted = DBStateCodeStarted;
exports.DBStateCodeFinished = DBStateCodeFinished;
exports.DBStateCodeFailed = DBStateCodeFailed;





// CREATE TABLE jobs
// ( 
//   `id` CHAR(30) NOT NULL,
//   `uuid` CHAR(16) NOT NULL,
//   `fuid` CHAR(16) NOT NULL,
//   `ts` CHAR(13) NOT NULL,
//   `start` TIMESTAMP NOT NULL,
//   `end` TIMESTAMP NOT NULL,
//   `state` CHAR(3) NOT NULL,
//   `device` CHAR(3) NOT NULL,
//   INDEX(`uuid`),
//   INDEX(`fuid`),
//   PRIMARY KEY (`id`)
// )DEFAULT CHARACTER SET = utf8;

// CREATE TABLE user
// ( 
//   `uuid` CHAR(16) NOT NULL,
//   `passwd` CHAR(16),
//   `mobile` VARCHAR(16),
//   `group` CHAR(8),
//   `level` TINYINT(2) UNSIGNED DEFAULT 1 NOT NULL ,
//   `creation_date` DATE,
//   `memo` VARCHAR(64),
//   UNIQUE INDEX(`mobile`),
//   PRIMARY KEY (`uuid`)
// )DEFAULT CHARACTER SET = utf8;

// CREATE TABLE task
// ( 
//   `id` CHAR(30) NOT NULL,
//   `fuid` CHAR(16) NOT NULL,
//   `uuid` CHAR(16) NOT NULL,
//   `ts` CHAR(13) NOT NULL,
//   `name` VARCHAR(64),
//   `state` CHAR(3) NOT NULL,
//   `update_ts` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//   `memo` VARCHAR(128),
//   INDEX(`uuid`),
//   INDEX(`fuid`),
//   PRIMARY KEY (`id`)
// )DEFAULT CHARACTER SET = utf8;
// task request data format --------------------------- 
// {
//     uuid: 'uuid',
//     fuid: 'fuid',
//     opts: {
//         scene:'Scene',
//         resolution: [1920, 1080],
//         engine: 'CYCLES' / 'BLENDER_EEVEE',
//         samples: 200,
//         frames: [1, 250],
//         step:1
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
//             scene:'Scene',
//             resolution: [1920, 1080],
//             engine: 'CYCLES' / 'BLENDER_EEVEE',
//             samples: 200,
//             frames: [1, 250],
//             step: 1,

//         }
//     }
// }