import * as Discord from 'discord.js';
const client = new Discord.Client();
import { env } from './environment';

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// This is run when the bot recieves a message.
client.on('message', (msg: Discord.Message) => {
    // If the id is anyone except the bots own ID.
    if (msg.author.id !== env.botId){
        // If you summoned the bot, respond to command
        if (msg.content.startsWith("<@" + env.botId + ">")) {
            msg.channel.send("You called?");
        }
        
        // TODO: Analyze sentient here
    }
});

client.login(env.token);