const TelegramBot = require("node-telegram-bot-api")
const { TOKEN } = require("../config")
const MessageControllers = require("./controllers/MessageControllers")
const mongo = require("./model/mongo")

const bot = new TelegramBot(TOKEN, {
    polling: true,
})

mongo()

bot.on("message", async (message) => {
    await MessageControllers(bot, message)
})
