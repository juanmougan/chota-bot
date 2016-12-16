let TelegramBot = require('node-telegram-bot-api');
let movieFetcher = require("./movie-fetcher");
let utils = require('./utils');

let bot = new TelegramBot('311477110:AAEPYL1lz75Gh52NgJfVbhwYbNnR56rqtIM', { polling: true });
let errorHanler = (err) => { bot.sendMessage(msg.chat.id, "Me siento mal, te contesto cuando me recupere");}

bot.onText(/^\/movie$/, function (msg) {
    movieFetcher.getTitle(errorHanler, (titleResult) => {
        console.log(`Responding /movie to ${msg.chat.id} with : ${titleResult}`); 
        bot.sendMessage(msg.chat.id, titleResult);
    });
});

bot.onText(/^\/chota$/, function (msg) {
    movieFetcher.getTitle(errorHanler, (titleResult) => {
        console.log(`Responding /chota to ${msg.chat.id} with : ${titleResult}`);
        bot.sendMessage(msg.chat.id, titleResult);
    })
});

bot.onText(/^\/chota (.*)/, function (msg, match) {
    let title = match[1];
    let found = false;
    let titleWords = title.split(" ");
    do {
        let wordIndex = utils.random(0, titleWords.length - 1);
        if(!utils.isStopWord(titleWords[wordIndex].toLowerCase())) {
            found = true;
            titleWords[wordIndex] = utils.findChotoGender(titleWords, wordIndex - 1);
            console.log(`Resonding /chota ${match[1]} to ${msg.chat.id} with : ${titleWords.join(" ")}`);
            bot.sendMessage(msg.chat.id, titleWords.join(" "));
        }
    } while(!found);
});

bot.onText(/\/ask (.+)/, function (msg) {
    console.log(`Responding 'Tu hermana!!! 'to ${msg.chat.id}`);
    bot.sendMessage(msg.chat.id, "Tu hermana!!!");
});

bot.onText(/\/echo (.+)/, function (msg, match) {
    console.log(`Echo ${match[1]} to ${msg.chat.id}`);
    bot.sendMessage(msg.chat.id, match[1]);
});

console.log("Bot in running...");
