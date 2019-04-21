import { Command } from "./command";
import { Message, Collection, GuildMember, DMChannel } from "discord.js";
import { env } from "../environment";

export class Help extends Command {
    constructor() {
        super('myth');
    }

    public call(msg: Message, command: string) {
        let help_msg = "Powers of TiaBot: \n";
        help_msg += "myth displays this message \n";
        help_msg += "kick [@username(s)] throws user(s) overboard \n";
        help_msg += "ban [@username(s)] returns user(s) to the cosmic abyss \n";
        help_msg += "tablet-of-destinies instigates a primordial battle between (non-admin) users. \n";
        help_msg += "Users that fail to please the goddess are cast into the sea. Last user remaining has the \n";
        help_msg += "Tablet of Destinies conferred on them by TiaBot, making them the new ruler of lesser users. \n";
        msg.channel.send(help_msg);
    }
}