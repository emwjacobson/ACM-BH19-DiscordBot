import * as Discord from 'discord.js';
const client = new Discord.Client();
import { env } from './environment';
import { Test } from './commands/test';
import { Command } from './commands/command';
import { Kick } from './commands/kick';
import { Ban } from './commands/ban';
import { SentimentAnalysis } from './commands/SentimentAnalysis';
import { CustomUsers } from './commands/CustomUsers';
import { stringify } from 'querystring';
import { ENETUNREACH } from 'constants';
import { userInfo } from 'os';
import { isNullOrUndefined } from 'util';
const EventEmitter = require('events').EventEmitter;
const myEventEmitter = new EventEmitter;
let arrUsers : CustomUsers[] = [];
import { Ping } from './commands/ping';
import { Join } from './commands/join';
import { Leave } from './commands/leave';
// $env:GOOGLE_APPLICATION_CREDENTIALS: env.GOOGLE_APPLICATION_CREDENTIALS;

let cmds: Command[] = [
    new Test(),
    new Kick(),
    new Ban(),
    new Ping(),
    new Join(),
    new Leave()
];

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// This is run when the bot recieves a message.
client.on('message', (msg: Discord.Message) => {
    // If the id is anyone except the bots own ID.
    if (msg.author.id !== env.botId){
        // If you summoned the bot, respond to command
        let check = "<@" + env.botId + ">";
        if (msg.content.startsWith(check)) {
            let command = msg.content.substring(check.length).trim();
            let split = command.split(" ");
            for(let cmd of cmds) {
                if(cmd.command_name == split[0]) {
                    cmd.call(msg, command);
                }
            }
        }
  
        // TODO: Analyze sentient here
        let sentiment = new SentimentAnalysis(msg);
        sentiment.onEvent.one(tick => {
            let found = false;
            let quotientNumber = 0;
            if(isNullOrUndefined(arrUsers))
            {
                arrUsers = [new CustomUsers(sentiment.user, sentiment.result.score)];
                quotientNumber = arrUsers[arrUsers.length - 1].getQuotient();
            }
            arrUsers.forEach(user => {
                if(user.equals(sentiment.message.author))
                {
                    user.updateQuotient(sentiment.result.score);
                    quotientNumber = user.getQuotient();
                    found = true;
                    return;
                }
            });
            if(!found)
            {
                arrUsers.push(new CustomUsers(sentiment.message.author, sentiment.result.score))
                quotientNumber = arrUsers[arrUsers.length - 1].getQuotient();
            }
            let retString = "Text: " + sentiment.message.content
                            + "\nUser: " + sentiment.message.author.username
                            + "\nCurrent Sentiment Quotient: " + quotientNumber;
            msg.channel.sendMessage(retString);
            console.log(retString);
        });
        //sentiment.onEvent.clear();

    }
});

client.login(env.token);

