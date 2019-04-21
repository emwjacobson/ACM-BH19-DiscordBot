import { Command } from "./command";
import { Message } from "discord.js";
import { env } from "../environment";

export class Ping extends Command {
    constructor() {
        super('ping');
    }

    public call(msg: Message, command: string) {
        msg.channel.send('asd');
    }
}