const Channel = require('../../evaluate/channel.model');


const databaseChannel = new Channel(process.channel.readline, 'db', 'db');

module.exports = databaseChannel;