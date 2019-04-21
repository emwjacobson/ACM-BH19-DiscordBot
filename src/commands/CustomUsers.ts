import * as Discord from 'discord.js';
import { Kick } from './kick';
import {Proverbs} from `./proverbs`;
var stringSimilarity = require('string-similarity');
abstract class IECustomUsers<T>
{
    abstract equals(obj:T) : boolean
}
export class CustomUsers extends IECustomUsers<Discord.User>{
    public user: Discord.User;
    private _quotient = 0;
    private _lastmsg = "";
    public isAlive = true;

    constructor(id: Discord.User, quotient: number, msg : Discord.Message, num : number ){
        super();
        this.user = id;
        this.updateQuotient(quotient, msg, num);
    }

    public updateQuotient(quotient : number, msg : Discord.Message, num : number) 
    {   
        let similiar = stringSimilarity.compareTwoStrings(msg.content, this._lastmsg)
        if ( similiar > 0.70)
        {
            this.kick("🦀🦀🦀CHEATER LOL🦀🦀🦀");
            return;
        }
        let seed = (Math.round(num / 5) + Math.round((Math.random() * Math.floor(10))));
        if(seed > 10)
        {
            seed = 10;
        }
        this.user.lastMessage.channel.sendMessage("MODE: " + seed);
        if(seed < 8){
        this._quotient += (quotient * 100);
        }
        else
        {
            switch (seed) {
                case 8:
                    this._quotient += 0;
                    break;
                case 9:
                    this._quotient -= (quotient * 100);
                    break;
                case 10:
                    this._quotient += (quotient * (num / 2));
                    break;
                default:
                    break;
            }
        }
        this._lastmsg = msg.content;
        
    }
    public equals(obj: Discord.User) : boolean { 
        return this.user.id === obj.id;
    } 
    public getQuotient()
    {
        return this._quotient;
    }
    public kick(str:string)
    {
        try{
        this._quotient = -9999999999999999;
        let prov = new Proverbs();
        str += prov.read() + "\n";
        str +="\nYour score is :" + this._quotient + "\nhttps://discord.gg/NFwQH2M"
        this.user.createDM().then((dm: Discord.DMChannel) => {
            dm.send(str);
            this.user.lastMessage.member.kick(str);
            this.isAlive = false;
        });
    }
    catch(e)
    {
        console.log(e);
    }
    }
}