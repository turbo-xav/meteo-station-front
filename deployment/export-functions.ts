const fs = require('fs');

exports.updateDate = () => {
    let rawPackageJson = fs.readFileSync('./package.json');
    const pakagejson = JSON.parse(rawPackageJson);
    const currentDate = new Date();
    const day = currentDate.getDate();
    const dayEc = day < 10 ? '0' + day : day;
    const month = currentDate.getMonth() + 1;
    const monthEc = month < 10 ? '0' + month : month;
    const year = currentDate.getFullYear();
    pakagejson.date = year + '-' + monthEc + '-' + dayEc;
    rawPackageJson = JSON.stringify(pakagejson, null, 4);
    fs.writeFileSync('./package.json', rawPackageJson);
}

exports.executeCommand = (command: string) => {
    console.log('Execute command : ', command);
    const result = require('child_process').execSync(command).toString();
    if (result) {
      console.log('result for command ', command, result);
    }
}

exports.getArgs = (name: string) => {
    const args = process.argv.slice(2);
    for (const arg of args) {
      const exploded = arg.split('=');
      if (exploded[0] === name) {
        return exploded.length === 2 ? exploded[1] : exploded[0];
      }
    }
  }