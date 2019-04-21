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
    .analyzeSentiment({document: document})
    .then((results: { documentSentiment: any; }[]) => {
      const sentiment = results[0].documentSentiment;
  
      console.log(`Text: ${msg.content}`);
      console.log(`Sentiment score: ${sentiment.score}`);
      console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
    })
    .catch((err: any) => {
      console.error('ERROR:', err);
    });
  
        this.user = msg.author;
        this.message = msg;
    }
}