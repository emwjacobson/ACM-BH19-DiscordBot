import { Command } from "./command";
import { Message, Collection, GuildMember, DMChannel } from "discord.js";
import { env } from "../environment";

export class Ban extends Command {
    constructor() {
        super('ban');
    }

    public call(msg: Message, command: string) {
        for (let member of msg.mentions.members.array()) {
            if(member.id !== env.botId) {
                member.ban();
                member.createDM().then((dm: DMChannel) => {
                    dm.send('https://discord.gg/NFwQH2M');
                });
                msg.channel.send("BYE!");
                msg.guild.unban(member);
            }
        }
    }
}