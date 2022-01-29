const eval = require('../../evaluate/index');


module.exports = new eval.Command({
    name: 'exit',
    action: () => process.kill(process.pid, 'SIGTERM')
}) 