const Discord = require('discord.js');
const client = new Discord.Client();
import { env }from './environment';

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// This is run when the bot recieves a message.
client.on('message', (msg: any) => {
    if (msg.content === 'ping') {
        msg.reply('pong');
    }
});

client.login(env.token);