import { Command } from "./command";
import { Message, Collection, GuildMember, DMChannel } from "discord.js";
import { env } from "../environment";

export class StartBR extends Command {
    private br_role: string = "569554270068932619";

    constructor() {
        super('startbr');
    }

    public call(msg: Message, command: string) {
        for(let role of msg.guild.roles.array()) {
            if (role.id === this.br_role) {
                for(let user of msg.guild.members.array()) {
                    user.addRole(role);
                }
                break;
            }
        }
    }
}