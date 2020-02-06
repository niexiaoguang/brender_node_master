const staticRootPath = '/home/pata/nginx/html/static/upload/blend/';

const queueName = 'brender_render_job_queue';



// error response 
const JobExistedErrorResponse = JSON.stringify({
    "status": "error",
    "info": "fuid render task already existed"
});




exports.staticRootPath = staticRootPath;

exports.queueName = queueName;

exports.JobExistedErrorResponse = JobExistedErrorResponse;