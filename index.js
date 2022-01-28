const read = require('./read');
const evaluate = require('./evaluate/evaluate');


// anonymous function at begining of program
(async () => {
    
    // intiate readline interface
    const rd = new read.CIHReadline();

    while(true) {

        const command = await rd.read(`tinker >> `);

        await evaluate.eval(command);

    }

})();


