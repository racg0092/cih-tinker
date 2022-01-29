const Channel = require('../../evaluate/channel.model');

const mainChannel = new Channel(process.channel.readline);

module.exports = mainChannel;