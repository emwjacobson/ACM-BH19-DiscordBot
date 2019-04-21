const client = new Discord.Client();
import * as Discord from 'discord.js';
import { env } from './environment';

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// This is run when the bot recieves a message.
client.on('message', (msg: Discord.Message) => {
    if (msg.author.id !== '569351692198608917'){
        msg.reply('lol');
    }
});

client.login(env.token);