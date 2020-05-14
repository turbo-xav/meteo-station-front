const { execSync } = require('child_process');
const readlineFtp = require('readline-sync');

exports.deploy = () => {
    console.log('Preparing git commit & push ...');
    executeCommand('git add -A');
    executeCommand('git st');
    let commitMsg = readlineFtp.question('What is your commit message ?');
    commitMsg = commitMsg ? commitMsg : 'Automatic releasing';
    executeCommand('git commit -m "' + commitMsg + '"');
    executeCommand('git pull');
    executeCommand('git push');
}


function executeCommand(command: string) {
    console.log('Execute command : ', command);
    const result = require('child_process').execSync(command).toString();
    if(result){
        console.log('result for command ', command, result);
    }
}

