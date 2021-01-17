const { execSync } = require('child_process');
const readlineFtp = require('readline-sync');
const functionsForFtp = require('./export-functions');

exports.deploy = () => {
  console.log('Preparing git commit & push ...');
  functionsForFtp.executeCommand('git pull');
  functionsForFtp.executeCommand('git add -A');
  functionsForFtp.executeCommand('git st');
  let commitMsg = readlineFtp.question('What is your commit message ?');
  commitMsg = commitMsg ? commitMsg : 'Automatic releasing';
  functionsForFtp.executeCommand('git commit -m "' + commitMsg + '"');
  functionsForFtp.executeCommand('git pull');
  functionsForFtp.executeCommand('git push');
  if (!!functionsForFtp.getArgs('--prod')) {
    functionsForFtp.executeCommand('npm version patch -m "Next iteration to %s"');
    functionsForFtp.executeCommand('git push');
  }
}



