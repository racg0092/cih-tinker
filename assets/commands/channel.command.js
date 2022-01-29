const Command = require('../../evaluate/command.model');
const path = require('path');
const fs = require('fs');


module.exports = new Command({
    name: 'channel',
    description: `
        Change between available channels
    `,
    action: async (args) => {
        if(args) {

            const script = path.join(`${__dirname}/../channels/${args[0]}.channel.js`);
           
            if(!fs.existsSync(script)) {
                console.log(`Channel (${args[0]}) does not exist.`);
                return;
            }             
            
            process.channel.close();
            
            process.channel = require(script);

            process.channel.start();

    
        }
        else {
            console.log(`Channel name is required. Sample (tinker >> channel {name})`);
        }
    }
})


