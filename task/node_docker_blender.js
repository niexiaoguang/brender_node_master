var blendProjectFilePath = 'test_small_cycles_cpu.blend';

var blendExecPath = '/home/pata/blender/blender-2.81a-linux-glibc217-x86_64/blender';

var localPath = '/home/pata/brender_dev/brender_node_master/task/blmedia/';
var containerPath = '/media/';
var containerOutputPath = '/media/';
var outputLogPath = localPath + 'output.log';
var engine = "CYCLES";
var samples = 64;
var frame = 2;
var w = 1920;
var h = 1080;
var scene = 'Scene';

var cmdRunBl = "docker run -i --log-driver=none -a stdin -a stdout -a stderr -v " +
    localPath + ":" +
    containerPath + " bl281abash -c \'/usr/local/blender/blender -b  " +
    containerPath + blendProjectFilePath +
    " -P " + containerPath + "prepare.py --" +
    " engine " + engine +
    " samples " + samples +
    " scene " + scene +
    " frame " + frame +
    " w " + w +
    " h " + h +
    " outputpath " + containerOutputPath +
    "\' > " +
    outputLogPath;


var cmdReadLogOutput = 'tail -n 1 ' + outputLogPath;


console.log(cmdRunBl);
console.log(cmdReadLogOutput);


var status;
const { exec } = require('child_process');
exec(cmdRunBl, (err, stdout, stderr) => {
    if (err) {
        //some err occurred
        console.error(err)
    } else {
        // the *entire* stdout and stderr (buffered)
        console.log(`blender stdout: ${stdout}`);
        status = stdout;
        console.log(`blender stderr: ${stderr}`);
    }
});
// function intervalFunc() {
//     console.log(status);

// }

// setInterval(intervalFunc, 500);




// function intervalFunc() {

//     const { exec } = require('child_process');
//     exec(cmd, (err, stdout, stderr) => {
//         if (err) {
//             // node couldn't execute the command
//             return;
//         }

//         // the *entire* stdout and stderr (buffered)
//         console.log(`stdout: ${stdout}`);
//         console.log(`stderr: ${stderr}`);
//     });

// }

// setInterval(intervalFunc, 1000);