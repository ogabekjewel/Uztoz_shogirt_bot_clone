const users = require("../model/UserModel")
const { v4 } = require("uuid")
const InvestorController = require("./InvestorController")
const MenuController = require("./MenuController")
const NewProjectInvestor = require("./NewProjectInvestor")
const PartnerController = require("./PartnerController")
const { ADMIN_ID } = require("../../config")

module.exports = async (bot, message) => {
    let text = message.text
    let user_id = message.from.id
      
    let user = await users.findOne({
        user_id,
    })

    if(!user) {
        await users.create({
            id: v4(),
            user_id,
            name: message.from.first_name,
            username: message.from.username,
        })   
    }

    if(user_id == ADMIN_ID) {
        if(text == "/post") {
            try {
                const messageId = message.reply_to_message.message_id
                let chatId = message.from.id
                let userList = await users.find()
                let interval = 1000 / 15

                for(let user of userList) {
                    setTimeout(async function () {
                        try {
                            let copy = await bot.copyMessage(user.user_id, chatId, messageId, {
                                reply_markup: message.reply_to_message.reply_markup,
                            })
                        } catch(e) {

                        }
                    }, interval)
                }   
            } catch(e) {
                console.log(e + "")
            }
        }
    }

    if(text == "/start") {
        await bot.sendMessage(user_id, "Assalomu alaykum")
        await MenuController(bot, message)
    } else if(user.menu == "investor" || text == "Investor kerak") {
        await InvestorController(bot, message)
    } else if(user.menu =="newproject" || text == "Yangi loyiha uchun investor") {
        await NewProjectInvestor(bot, message)
    } else if(user.menu == "partner" || text == "Sherik kerak") {
        await PartnerController(bot, message)
    } else if(text == "Aloqa") {  
        bot.sendMessage(user_id, "Bu bo'lim yaqin orada qo'shiladi🤐")
    }
}

          