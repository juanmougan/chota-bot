let TelegramBot = require('node-telegram-bot-api');
let MovieFetcher = require("./movie-fetcher");
let movieFetcher = new MovieFetcher();

let bot = new TelegramBot('311477110:AAEPYL1lz75Gh52NgJfVbhwYbNnR56rqtIM', { polling: true });

bot.onText(/^\/movie$/, function (msg) {
    movieFetcher.getTitle((titleResult) => {bot.sendMessage(msg.chat.id, titleResult);})
});

bot.onText(/^\/chota$/, function (msg) {
    movieFetcher.getTitle((titleResult) => {bot.sendMessage(msg.chat.id, titleResult);})
});

bot.onText(/\/ask (.+)/, function (msg) {
    bot.sendMessage(msg.chat.id, "Tu hermana!!!");
});

bot.onText(/\/echo (.+)/, function (msg, match) {
    bot.sendMessage(msg.chat.id, match[1]);
});

bot.on('message', function (msg) {
    if(/(porque|por\sque)/.test(msg.text)) {
        bot.sendMessage(msg.chat.id, "Por que a tu hermana le gusta!!!")
    }
    
    if(/(hay|va haber)\sdaily/.test(msg.text)) {
        bot.sendMessage(msg.chat.id, "Se cancela la daily")
    }
});
