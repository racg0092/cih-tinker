const read = require('./read');
const Channel = require('./evaluate/channel.model');


// anonymous function at begining of program
(async () => {
    
    // intiate readline interface
    const rd = new read.CIHReadline();

    // initiates main channel
    process.channel = new Channel(rd);

    process.global_commands = process.channel.getCommands();

    process.channel.start();

})();


