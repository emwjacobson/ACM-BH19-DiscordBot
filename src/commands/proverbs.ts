export class Proverbs {
    public proverbs : string[] = new Array(
        "Drown in the salt sea", 
    "Submit yourself to chaos", 
    "Return to the darkness")

    constructor() 
    {
    }

    public read()
    {
        return this.proverbs[Math.round(Math.floor(this.proverbs.length - 1) * Math.random())] + `\n`
    }
}