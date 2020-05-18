const { execSync } = require('child_process');
const readlineFtp = require('readline-sync');

const getArgs1 = (name: string) => {
    const args = process.argv.slice(2);
    for (const arg of args) {
      const exploded = arg.split('=');
      if (exploded[0] === name) {
        return exploded.length === 2 ? exploded[1] : exploded[0];
      }
    }
  }

exports.deploy = () => {
    console.log('Preparing git commit & push ...');
    executeCommand('git pull');
    executeCommand('git add -A');
    executeCommand('git st');
    let commitMsg = readlineFtp.question('What is your commit message ?');
    commitMsg = commitMsg ? commitMsg : 'Automatic releasing';
    executeCommand('git commit -m "' + commitMsg + '"');
    executeCommand('git pull');
    executeCommand('git push');
    if(!!getArgs1('--prod')){
        executeCommand('npm version patch -m "Next iteration to %s"');
        executeCommand('git push');
    }
}


function executeCommand(command: string) {
    console.log('Execute command : ', command);
    const result = require('child_process').execSync(command).toString();
    if(result){
        console.log('result for command ', command, result);
    }
}

