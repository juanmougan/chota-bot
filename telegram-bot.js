let TelegramBot = require('node-telegram-bot-api');
let getTitle = require('./index');

let bot = new TelegramBot('311477110:AAEPYL1lz75Gh52NgJfVbhwYbNnR56rqtIM', { polling: true });

bot.onText(/^\/movie$/, function (msg) {
    getTitle((titleResult) => {bot.sendMessage(msg.chat.id, titleResult);})
});

bot.onText(/\/echo (.+)/, function (msg, match) {
    bot.sendMessage(msg.chat.id, match[1]);
});