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
const DBFuidColName = 'fuid';
const DBUuidColName = 'uuid';
const DBTsColName = 'ts';
const DBStartColName = 'start';
const DBResColName = 'res';
const DBEndColName = 'end';
const DBNameColName = 'name';
const DBMemoColName = 'memo';
const DBStateColName = 'state';
const DBUpdateTsColName = 'update_ts';
const DBDeviceColName = 'device';
const DBIdColName = 'id';


const DBStateStoppedCode = 'stp';
const DBStateStartedCode = 'sta';
const DBStateFinishedCode = 'fin';
const DBStateFailedCode = 'fai';




const Seperator = '-';

// most numbbet of worker at a time for a task , fixed only dev  TODO 
const ConWorkersNum = 2;


const DBTaskTabName = 'task';
const DBTaskTabStateColName = 'state';
const TaskStateCodeFailed = 4;
const TaskStateCodeFinished = 3;
const TaskStateCodeStopped = 2;
const TaskStateCodeStarted = 1;
const TaskStateCodeUploaded = 0;
// -------------------------------------------------------------
// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -
exports.TaskStateCodeFailed = TaskStateCodeFailed;
exports.TaskStateCodeFinished = TaskStateCodeFinished;
exports.TaskStateCodeStopped = TaskStateCodeStopped;
exports.TaskStateCodeStarted = TaskStateCodeStarted;
exports.TaskStateCodeUploaded = TaskStateCodeUploaded;


exports.staticRootPath = staticRootPath;

exports.JobsQueueName = JobsQueueName;

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
exports.DBTaskTabName = DBTaskTabName;
exports.DBTaskTabStateColName = DBTaskTabStateColName;

exports.DBFuidColName = DBFuidColName;
exports.DBUuidColName = DBUuidColName;
exports.DBTsColName = DBTsColName;
exports.DBStartColName = DBStartColName;
exports.DBEndColName = DBEndColName;
exports.DBNameColName = DBNameColName;
exports.DBMemoColName = DBMemoColName;
exports.DBStateColName = DBStateColName;
exports.DBUpdateTsColName = DBUpdateTsColName;
exports.DBDeviceColName = DBDeviceColName;
exports.DBIdColName = DBIdColName;


exports.DBStateStoppedCode = DBStateStoppedCode;
exports.DBStateStartedCode = DBStateStartedCode;
exports.DBStateFinishedCode = DBStateFinishedCode;
exports.DBStateFailedCode = DBStateFailedCode;



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