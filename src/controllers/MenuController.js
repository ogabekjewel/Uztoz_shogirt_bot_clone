const users = require("../model/UserModel")

module.exports = async function(bot, message) {
    try {
        const user_id = message.from.id

        await users.findOneAndUpdate({
            user_id,
        }, {
            step: 0,
        })

        let keyboard = {
            resize_keyboard: true,
            keyboard: [
                [
                    {
                        text: "Investor kerak",
                    },
                    {
                        text: "Yangi loyiha uchun investor", 
                    },
                ],
                [
                    {
                        text: "Sherik kerak",
                    },
                    {
                        text: "Aloqa",
                    },
                ],
            ]
        }

        await bot.sendMessage(user_id, "Quyidagi menulardan birini tanlang", {
            reply_markup: keyboard,
        })
    } catch(e) {
        console.log(e)
    }
}