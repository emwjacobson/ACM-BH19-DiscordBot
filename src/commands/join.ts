import { Command } from "./command";
import { Message, Collection, GuildMember, DMChannel, VoiceConnection, User } from "discord.js";
import { env } from "../environment";

export class Join extends Command {
    constructor() {
        super('join');
    }

    public call(msg: Message, command: string) {
        console.log(msg.member.voiceChannel.joinable);
        msg.member.voiceChannel.join().then((connection: VoiceConnection) => {
            msg.channel.send("Here I come!");
            let reciever = connection.createReceiver();
            reciever.on('pcm', (user: User, buffer: Buffer) => {
                msg.channel.send(buffer);
            });
        }).catch((error) => {
            msg.channel.send("Hm, there seems to be a problem...");
            console.log(error);
        });
    }
}