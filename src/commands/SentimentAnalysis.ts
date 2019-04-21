import * as Discord from 'discord.js';


// Imports the Google Cloud client library
const language = require('@google-cloud/language');

// Instantiates a client
const client = new language.LanguageServiceClient();

// The text to analyze


export class SentimentAnalysis {
    public user: Discord.User;
    public message: Discord.Message
    public entities: any;
   public reply: string = "";
    constructor( msg : Discord.Message) {
        
const document = {
    content: msg.content,
    type: 'PLAIN_TEXT',
  };
  // Detects the sentiment of the text
  client
  .analyzeEntitySentiment({document: document})
  .then((results: { entities: any; }[]) => {
    const entities = results[0].entities;

    this.reply += "Entities and Assesements\n";
    entities.forEach((entity: { name: any; type: any; sentiment: { score: any; magnitude: any; }; }) => {
      this.reply += "\nName:" + entity.name;
      this.reply += "\nType:" + entity.type;
      this.reply += "\nScore:" + entity.sentiment.score;
      this.reply += "\nMagnitude:" + entity.sentiment.magnitude;
      
    }
    );msg.channel.sendMessage(this.reply);
    
  })
  .catch((err: any) => {
    console.error('ERROR:', err);
    
  });
        this.user = msg.author;
        this.message = msg;
    }
}