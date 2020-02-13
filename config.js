const RootPath = '/media/';
const logPath = '/log/';

// -------------------------------------------------------------


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

const TaskConfigFileSaveErrorResp = JSON.stringify({
    status: 'error',
    info: "config file save error"
});
const TaskConfigFileSaveErrorCode = 4005;


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


exports.OkResp = OkResp;
exports.TaskExistedErrResp = TaskExistedErrResp;
exports.TaskExistedErrCode = TaskExistedErrCode;

exports.StopNotExistTaskErrResp = StopNotExistTaskErrResp;
exports.StopNotExistTaskErrCode = StopNotExistTaskErrCode;

exports.StartExistingTaskErrResp = StartExistingTaskErrResp;
exports.StartExistingTaskErrCode = StartExistingTaskErrCode;

exports.TaskUserNotMatchErrResp = TaskUserNotMatchErrResp;
exports.TaskUserNotMatchErrCode = TaskUserNotMatchErrCode;


exports.TaskConfigFileSaveErrorCode = TaskConfigFileSaveErrorCode;
exports.TaskConfigFileSaveErrorResp = TaskConfigFileSaveErrorResp;






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