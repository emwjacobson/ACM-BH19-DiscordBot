import { Command } from "./command";
import { Message } from "discord.js";

export class Test extends Command {
    constructor() {
        super('test');
    }

    public call(msg: Message, command: string) {
        msg.channel.send("It worked!");
    }
}