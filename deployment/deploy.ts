/**
  * This file is used to deploy on FTP & Git your application 
  */

const gitFeature = require('./deploy-git');
const ftpFeature = require('./deploy-ftp');

const getArgs = (name: string) => {
  const args = process.argv.slice(2);
  for (const arg of args) {
    const exploded = arg.split('=');
    if (exploded[0] === name) {
      return exploded.length === 2 ? exploded[1] : exploded[0];
    }
  }
}
//Ftp config
const ftpConfig = {
  user: 'projetsw',
  host: 'ftp.cluster010.hosting.ovh.net',
  port: 21,
  localRoot: __dirname + '/../docs/meteo-station',
  remoteRoot: '/www/meteo-station' + (!getArgs('--prod') ? '-test' : ''),
  include: ['*', '**/*'],
  deleteRemote: true,
  forcePasv: true
};

ftpFeature.deploy(ftpConfig, gitFeature.deploy);
