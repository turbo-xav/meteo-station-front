const FtpDeploy = require('ftp-deploy');

exports.deploy = (config, callBack) => {
   // Deploy config
const ftpDeploy = new FtpDeploy();

ftpDeploy.on('log', (data) => {
  console.log('Ftp Info : ',data);
});

ftpDeploy.on('uploading', (data) => {
  console.log('Uploading infos : ', data.filename, 'Transfered :', data.transferredFileCount, '/', data.totalFilesCount);
});

ftpDeploy.on('upload-error', (data) => {
	console.error('Upload errors infos : ', data.err);
});

ftpDeploy.on('uploaded', (data) => {
	console.log('Uploaded info : ', data);
});
// Deployment
ftpDeploy
  .deploy(config)
  .then(
    res => {
      console.log('Deploy is OK : ', res);
      if(callBack){
            callBack();
      }else{
          console.log('No callback');
      }
    }
  )
  .catch(
    err => {
      console.error('Cannot deploy');
      if (err.code) {
        console.error('Code Error : ', err.code);
      }
      console.error('The reason is : ', err.message)
    }
  );
}