import * as Discord from 'discord.js';


// Imports the Google Cloud client library
const language = require('@google-cloud/language');

// Instantiates a client
const client = new language.LanguageServiceClient();

// The text to analyze


export class SentimentAnalysis {
    public user: Discord.User;
    public message: Discord.Message

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

    console.log(`Entities and sentiments:`);
    entities.forEach((entity: { name: any; type: any; sentiment: { score: any; magnitude: any; }; }) => {
      console.log(`  Name: ${entity.name}`);
      console.log(`  Type: ${entity.type}`);
      console.log(`  Score: ${entity.sentiment.score}`);
      console.log(`  Magnitude: ${entity.sentiment.magnitude}`);
    });
  })
  .catch((err: any) => {
    console.error('ERROR:', err);
  });
  
        this.user = msg.author;
        this.message = msg;
    }
}