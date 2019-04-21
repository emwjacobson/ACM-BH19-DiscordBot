import * as Discord from 'discord.js';
abstract class IECustomUsers<T>
{
    abstract equals(obj:T) : boolean
}
export class CustomUsers extends IECustomUsers<Discord.User>{
    public user: Discord.User;
    private _quotient = 0;

    constructor(id: Discord.User, quotient: number) {
        super();
        this.user = id;
        this.updateQuotient;
    }

    public updateQuotient(quotient : number)
    {
        //let seed =  (Math.random() * Math.floor(40));
        this._quotient += (quotient * 100);
    }
    public equals(obj: Discord.User) : boolean { 
        return this.user.id === obj.id;
    } 
    public getQuotient()
    {
        return this._quotient;
    }
}