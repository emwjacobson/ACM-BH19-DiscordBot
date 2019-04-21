import { Command } from "./command";
import { Message, Collection, GuildMember, DMChannel } from "discord.js";
import { env } from "../environment";

export class Kick extends Command {
    constructor() {
        super('kick');
    }

    public call(msg: Message, command: string) {
        for (let member of msg.mentions.members.array()) {
            if(member.id !== env.botId) {
                member.kick();
                member.createDM().then((dm: DMChannel) => {
                    dm.send('https://discord.gg/NFwQH2M');
                });
                msg.channel.send("BYE!");
            }
        }
    }
}