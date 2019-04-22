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
import { StartBR } from './commands/startbr';
import { EndBR } from './commands/endbr';
import { start } from 'repl';
// $env:GOOGLE_APPLICATION_CREDENTIALS: env.GOOGLE_APPLICATION_CREDENTIALS;
var msgNum = 0;
var ctr = 0;
var startGame = false;
let cmds: Command[] = [
    new Test(),
    new Kick(),
    new Ban(),
    new Ping(),
    new Join(),
    new Leave(),
    new StartBR(),
    new EndBR(),
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
        if (msg.author.lastMessage.member.roles.array().filter((rol: Discord.Role) => { return rol.id === "569402315535155201"; }).length === 0)
        {
        sentimentAnalysis(msg);
        }
        //sentiment.onEvent.clear();

    }
});

client.login(env.token);

function sentimentAnalysis(msg: Discord.Message) {
    let sentiment = new SentimentAnalysis(msg);
    sentiment.onEvent.one(tick => {
        msgNum++;
        ctr++;
        let alive = true;
        let found = false;
        let quotientNumber = 0;
        var temp  = 0;
        if (isNullOrUndefined(arrUsers)) {
            arrUsers = [new CustomUsers(sentiment.user, sentiment.result.score, sentiment.message, msgNum)];
            quotientNumber = arrUsers[arrUsers.length - 1].getQuotient();
            alive = arrUsers[arrUsers.length - 1].isAlive;
            temp = arrUsers.length - 1;
        }
        arrUsers.forEach(user => {
            if (user.equals(sentiment.message.author)) {
                user.updateQuotient(sentiment.result.score, sentiment.message, msgNum);
                quotientNumber = user.getQuotient();
                if (quotientNumber <= -500) {
                    user.kick("");
                }
                temp = arrUsers.indexOf(user);
                found = true;
                alive = user.isAlive;
                return;
            }
        });
        if (!found) {
            arrUsers.push(new CustomUsers(sentiment.message.author, sentiment.result.score, sentiment.message, msgNum));
            quotientNumber = arrUsers[arrUsers.length - 1].getQuotient();
            alive = arrUsers[arrUsers.length - 1].isAlive;
            temp = arrUsers.length - 1;
        }
        if (!alive) {
            arrUsers.splice(temp)
        }
        if (ctr > 5) {
            let sortFunction = (user1: CustomUsers, user2: CustomUsers) => {
                return user1.getQuotient() - user2.getQuotient();
            };
            arrUsers = arrUsers.sort(sortFunction);
            arrUsers.pop();
            ctr = 0;
        }
        let retString = "Text: " + sentiment.message.content
            + "\nUser: " + sentiment.message.author.username
            + "\nCurrent Sentiment Quotient: " + quotientNumber
            + "\nCurrent number of message: " + msgNum
            + "\nCurrent users playing:";
        arrUsers.forEach(element => {
            retString += "\n" + element.user.username;
        });
        msg.channel.sendMessage(retString);
        console.log(retString);
    });
}

