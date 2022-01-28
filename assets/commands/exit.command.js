module.exports = {
    name: 'exit',
    action: () => process.kill(process.pid, 'SIGTERM')
}