import * as Discord from "discord.js";
import { throws } from "assert";
import { SimpleEventDispatcher,  } from "ste-simple-events";
// Imports the Google Cloud client library
const language = require("@google-cloud/language");

// Instantiates a client
const client = new language.LanguageServiceClient();
// The text to analyze

export class SentimentAnalysis {
  public user: Discord.User;
  public message: Discord.Message;
  public ready: boolean;
  public result: any;
  public tick = 0;
  private _onEvent = new SimpleEventDispatcher<number>();
  public get onEvent() {
    return this._onEvent.asEvent();
  }
  constructor(msg: Discord.Message) {
    const document = {
      content: msg.content,
      type: "PLAIN_TEXT"
    };
    this.result = null;
    this.ready = false;
    // Detects the sentiment of the text
    client
      .analyzeSentiment({ document: document })
      .then((results: { documentSentiment: any }[]) => {
        const sentiment = results[0].documentSentiment;
        console.log("after sent = results")
        this.tick++;
          this.result = results[0].documentSentiment;
          console.log(`Text: ${msg.content}`);
          console.log (`Name: ${msg.author.tag}`);
          console.log(`Sentiment score: ${sentiment.score}`);
          console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
        console.log("outside");
        console.log(this.tick);
        this._onEvent.dispatch(this.tick);
        let getfunc = () => {}
        //setTimeout(getfunc, 1000);
    this._onEvent.clear();
      })
      .catch((err: any) => {
        console.error("ERROR:", err);
        this.ready = true;
      });
    this.user = msg.author;
    this.message = msg;
  }
}
