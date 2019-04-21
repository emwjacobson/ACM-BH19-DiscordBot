import * as Discord from 'discord.js';
const client = new Discord.Client();
import { env } from './environment';
import { Test } from './commands/test';
import { Command } from './commands/command';
import { Kick } from './commands/kick';
import { Ban } from './commands/ban';
import { SentimentAnalysis } from './commands/SentimentAnalysis';
import { Ping } from './commands/ping';
// $env:GOOGLE_APPLICATION_CREDENTIALS: env.GOOGLE_APPLICATION_CREDENTIALS;
let cmds: Command[] = [
    new Test(),
    new Kick(),
    new Ban(),
    new Ping(),
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
        msg.channel.send(sentiment.reply);
    }
});

client.login(env.token);