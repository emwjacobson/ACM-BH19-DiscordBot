import { Message } from "discord.js";

export class Command {
    public command_name: string;

    constructor(command_name: string) {
        this.command_name = command_name;
    }

    public call(msg: Message, command: string) {
        console.log("No call() function defined for", this.command_name);
    }
}