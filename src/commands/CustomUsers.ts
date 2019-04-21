import * as Discord from 'discord.js';
abstract class IECustomUsers<T>
{
    abstract equals(obj:T) : boolean
}
export class CustomUsers extends IECustomUsers<Discord.User>{
    public user: Discord.User;
    private _quotient = 0;
    private _lastquotient = 0;

    constructor(id: Discord.User, quotient: number) {
        super();
        this.user = id;
        this.updateQuotient;
    }

    public updateQuotient(quotient : number)
    {   
        if(quotient = this._lastquotient)
        {
            this._quotient += -9999999;
            return;
        }
        let seed =  (Math.random() * Math.floor(10));
        if(seed  < 5){
        this._quotient += (quotient * 100);
        }
        else
        {
            switch (seed) {
                case 6:
                    this._quotient += (quotient * 30);
                    break;
                case 7:
                    this._quotient -= (quotient * 100);
                break;
                case 8:
                    this._quotient = 0;
                    break;
                case 9:
                    this._quotient *= (quotient);
                    break;
                case 10:
                    this.updateQuotient(quotient);
                default:
                    break;
            }
        }
        this._lastquotient = quotient;
    }
    public equals(obj: Discord.User) : boolean { 
        return this.user.id === obj.id;
    } 
    public getQuotient()
    {
        return this._quotient;
    }
}