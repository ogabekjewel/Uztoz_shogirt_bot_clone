const TelegramBot = require("node-telegram-bot-api")
const { TOKEN, PORT, URL } = require("../config")
const MessageControllers = require("./controllers/MessageControllers")
const mongo = require("./model/mongo")

// const bot = new TelegramBot(TOKEN, {
//     polling: true,
// })



// const url = "https://uztozshogirtclone.herokuapp.com"

const bot = new TelegramBot(TOKEN, {
    webHook: {
        port: PORT,
    }
});

bot.setWebHook(`${URL}/bot${TOKEN}`)

mongo()

bot.on("message", async (message) => {
    await MessageControllers(bot, message)
})
