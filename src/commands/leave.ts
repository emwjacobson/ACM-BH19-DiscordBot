import { Command } from "./command";
import { Message, Collection, GuildMember, DMChannel } from "discord.js";
import { env } from "../environment";
import { SSL_OP_EPHEMERAL_RSA } from "constants";

export class Leave extends Command {
    constructor() {
        super('leave');
    }

    public call(msg: Message, command: string) {
        msg.member.voiceChannel.leave();
    }
}