import { Command } from "./command";
import { Message, Collection, GuildMember, DMChannel, UserProfile } from "discord.js";
import { env } from "../environment";

export class EndBR extends Command {
    private br_role: string = "569554270068932619";

    constructor() {
        super('endbr');
    }

    public call(msg: Message, command: string) {
        for(let user of msg.guild.members.array()) {
            user.removeRole(this.br_role);
        }
    }
}