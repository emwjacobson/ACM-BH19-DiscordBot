import { Command } from "./command";
import { Message, Collection, GuildMember, DMChannel } from "discord.js";
import { env } from "../environment";

export class Help extends Command {
    constructor() {
        super('help');
    }

    public call(msg: Message, command: string) {
        let help_msg = "@TiaBot to \n";
        help_msg += "startbr - starts a BR session";
        help_msg += "endbr - ends a BR session";
        msg.channel.send(help_msg);
    }
}