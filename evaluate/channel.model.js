const evaluate = require('./evaluate');
const EventEmitter = require('events');
const path = require('path');
const fs = require('fs');

class Channel {
    
    #state = new EventEmitter();
    #comands_location;
    #commands = {};
    
    constructor(readline, commandsLocation = undefined, name = undefined) {
        
        this.name = name;
        this.prompt = name ? `tinker:${this.name} >> ` :  `tinker >> `;
        
        
        this.#comands_location = commandsLocation ? 
            path.join(`${__dirname}/../assets/commands/${commandsLocation}/`) :
            path.join(`${__dirname}/../assets/commands/`);
        
        // console.log(this.#comands_location);

        this.readline = readline;
        this.loopRunning = false; 

        this.#state.on('close', () => this.loopRunning = false);
        this.#state.on('open', async () => { 
            
            this.loopRunning = true;

            await this.loop()

        })

        this.#loadCommands();
    }

    #loadCommands() {
        try {
            fs.readdirSync(path.join(this.#comands_location))
                .filter(file => file.endsWith('command.js'))
                .forEach(file => this.#commands[file] = file);

                // console.log(this.#commands)
        }
        catch(error) {
            console.error(error);
        }
    }

    getCommands() {
        return this.#commands;
    }

    async loop() {

        while(this.loopRunning) {

            // read user input
            let input = await this.readline.read(this.prompt);

            // create an array by splitting input based on spaces
            input  = input.split(' ');

            // grab the comand 
            let command = input[0];

            // determin if these is a globla command and not channel specific
            const isGlobal = command.indexOf('.') === 0;

            // if it is global change path to global commands
            const reqPath = isGlobal ? 
                path.join(`${__dirname}/../assets/commands/`) :
                this.#comands_location;

            // clean inital period form the command if command has one
            command = command.indexOf('.') === 0 ?
                command.substring(1) :
                command;
            
            // check if command is valid in channel
            if(!this.#commands[`${command}.command.js`] && !isGlobal) {
                console.log(`Command ${command} is not recognized`);
                continue;
            }
            else if(isGlobal) { // if command is global check if is valid in global scope                
                
                if(!process.global_commands[`${command}.command.js`]) {
                    console.log(`Global Command ${command} is not recognized`);
                    continue;
                }

            }
            
            // grab arguments if any from input arrya
            let args = input.slice(1);

            // pull command object
            console.log(`${reqPath}${command}.command.js`);
            const actionCommand = require(`${reqPath}${command}.command.js`);

            // run command action
            await actionCommand.action(args.length > 0 ? args : undefined);

        }
    }

    start() {
        this.#state.emit('open');
    }

    close() {
        this.#state.emit('close');
    }




}



module.exports = Channel;