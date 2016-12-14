let TelegramBot = require('node-telegram-bot-api');
let MovieFetcher = require("./movie-fetcher");
let movieFetcher = new MovieFetcher();

let bot = new TelegramBot('311477110:AAEPYL1lz75Gh52NgJfVbhwYbNnR56rqtIM', { polling: true });

bot.onText(/^\/movie$/, function (msg) {
    movieFetcher.getTitle((titleResult) => {bot.sendMessage(msg.chat.id, titleResult);})
});

bot.onText(/\/echo (.+)/, function (msg, match) {
    bot.sendMessage(msg.chat.id, match[1]);
});