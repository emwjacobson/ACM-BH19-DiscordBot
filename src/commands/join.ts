import { Command } from "./command";
import { Message, Collection, GuildMember, DMChannel, VoiceConnection, User } from "discord.js";
import { env } from "../environment";

export class Join extends Command {
    // private voice_buffers: Map<>
    
    constructor() {
        super('join');
    }

    public call(msg: Message, command: string) {
        msg.member.voiceChannel.join().then((connection: VoiceConnection) => {
            msg.channel.send("Here I come!");
            // connection.playFile("C:/crab.mp3");
            let reciever = connection.createReceiver();
            reciever.on('pcm', (user: User, buffer: Buffer) => {
                console.log(user.username, "is talking", buffer);
            });
        }).catch((error) => {
            msg.channel.send("Hm, there seems to be a problem...");
            console.log(error);
        });
    }
}