const readline = require('readline');

class CIHReadline {

    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
    }


    read(question) {
        return new Promise((res, rej) => {
            this.rl.question(question, (answer) => {
                try{
                    res(answer);
                }
                catch(error) {
                    rej(error)
                }
            })
        })
    }

}



module.exports = CIHReadline;