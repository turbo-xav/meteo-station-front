
/**
  *
  * This file is used to deply on FTP server the build appplication
  *  
  */

// Include
const readline = require('readline-sync');
const FtpDeploy = require('ftp-deploy');
const { exec } = require('child_process');


function gitRelease(msg: string){
  exec('git pull && git add -A && git commit -m "'+msg+'" && git push', (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {        
       console.log('stderr : ', stderr);
        return;
    }
    console.log(`stdout: ${stdout}`);
  });
}

// Deploy config
const ftpDeploy = new FtpDeploy();

ftpDeploy.on('log', function(data) {
  console.log(data); // same data as uploading event
});

ftpDeploy.on('uploading', function(data) {
    console.log('Uploading : ',data.filename, 'Transfered :', data.transferredFileCount, '/',data.totalFilesCount);
});

// Input kayboard for password
const passwword = readline.question('What is your password ?');
const config = {
  user: 'projetsw',
  password: passwword,
  host: 'ftp.cluster010.hosting.ovh.net',
  port: 21,
  localRoot: __dirname + '/docs/meteo-station',
  remoteRoot: '/www/meteo-station',
  include: ['*', '**/*'],
  deleteRemote: true,
  forcePasv: true
};

// Deployment
ftpDeploy
  .deploy(config)
  .then(
      res => { 
        console.log('Deploy is OK : ', res); 
        console.log('Preparing git commit & push ...');
        let commitMsg = readline.question('What is your commit message ?');
        commitMsg = commitMsg ? commitMsg : 'Automatic releasing';
        gitRelease(commitMsg);
      }
  )
  .catch(
      err => { 
        console.error('Cannot deploy');
        if(err.code){
          console.error('Code Error : ', err.code);
        }
        console.error('The reason is : ',err.message) 
    }
);