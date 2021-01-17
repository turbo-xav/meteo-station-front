/**
  * This file is used to deploy on FTP & Git your application 
  */

const myFunctions = require('./export-functions');
const gitFeature = require('./deploy-git');
const ftpFeature = require('./deploy-ftp');


//Ftp config
const ftpConfig = {
  user: 'projetsw',
  host: 'ftp.cluster010.hosting.ovh.net',
  port: 21,
  localRoot: __dirname + '/../docs/meteo-station',
  remoteRoot: '/www/meteo-station' + (!myFunctions.getArgs('--prod') ? '-test' : '-prod'),
  include: ['*', '**/*'],
  deleteRemote: true,
  forcePasv: true
};
console.log(ftpConfig);
ftpFeature.deploy(ftpConfig, gitFeature.deploy);
