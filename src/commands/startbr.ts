import { Command } from "./command";
import { Message, Collection, GuildMember, DMChannel, Role } from "discord.js";
import { env } from "../environment";

export class StartBR extends Command {
    private br_role: string = "569554270068932619";
    private admin_role: string = "569402315535155201";

    constructor() {
        super('tablet-of-destinies');
    }

    public call(msg: Message, command: string) {
        console.log(msg.guild.roles.array());
        for(let role of msg.guild.roles.array()) {
            if (role.id === this.br_role) {
                for(let user of msg.guild.members.array()) {
                    console.log("\n\n\n\n");
                    if (user.roles.array().filter((rol: Role) => { return rol.id === this.admin_role; }).length === 0) {
                        user.addRole(role);
                    }
                }
                break;
            }
        }
    }
}