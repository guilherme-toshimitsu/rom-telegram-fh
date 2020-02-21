const TelegramBot = require(`node-telegram-bot-api`);
const TOKEN = require("../config/telegram");

const bot = new TelegramBot(TOKEN, { polling: true });

// bot.on("message", (msg, chat) => {
//   console.log("aquiiii", msg, chat);
//   bot.sendMessage(
//     msg.chat.id,
//     `Olá ${msg.from.first_name}, testando esse bizu`
//   );
// });

module.exports = bot;
