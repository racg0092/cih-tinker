const fs = require('fs');
const path = require('path')

const commands = {};

fs.readdirSync(path.join(`${__dirname}/../assets/commands`))
    .filter(file => file.endsWith('.command.js'))
    .forEach(file => commands[file] = file);


const eval = async (commandName) => {

    commandName = `${commandName}.command.js`;

    const allowCommand = commands[commandName];

    if(allowCommand) {
        const command = require(path.join(`${__dirname}/../assets/commands/${allowCommand}`));

        command.action();
    }
    else {
        console.log(`${commandName.substring(0, commandName.indexOf('.'))} is not recognize`);
    }
}



module.exports = {
    eval
}