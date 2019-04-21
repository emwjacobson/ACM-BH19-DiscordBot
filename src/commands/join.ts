import { Command } from "./command";
import { Message, Collection, GuildMember, DMChannel, VoiceConnection, User } from "discord.js";
import { env } from "../environment";

export class Join extends Command {
    // private voice_buffers: Map<string, string>;
    
    constructor() {
        super('join');
    }

    public call(msg: Message, command: string) {
        msg.member.voiceChannel.join().then((connection: VoiceConnection) => {
            msg.channel.send("Here I come!");
            connection.playFile("C:/sounds/bing.mp3");
            let reciever = connection.createReceiver();
            reciever.on('pcm', (user: User, buffer: Buffer) => {
                // let buf: string = (typeof this.voice_buffers.get(user.id) === undefined ? this.voice_buffers.get(user.id) : "");
                // this.voice_buffers.set(user.id, buf);
                console.log(user.username, "is talking", buffer);
            });
        }).catch((error) => {
            msg.channel.send("Hm, there seems to be a problem...");
            console.log(error);
        });
    }
}