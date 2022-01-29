const {BehaviorSubject , Observable }= require('rxjs');
const Channel = require('../evaluate/channel.model');

class ChannelService {

    #current_channel = new BehaviorSubject(undefined);

    constructor() {
    }

    setCurrentChannel(channel) {
        this.#current_channel.next(channel)
    }

    getCurrentChannel() {
        return this.#current_channel.asObservable();
    }
}



module.exports = ChannelService