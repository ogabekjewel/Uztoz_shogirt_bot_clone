const { v4 } = require("uuid")
const applications = require("../model/ApplicationModel")
const users = require("../model/UserModel")
const MenuController = require("./MenuController")
const MessageControllers = require("./MessageControllers")

module.exports = async function(bot, message) {
    try {
        let user_id = message.from.id
        let text = message.text

        let user = await users.findOne({
            user_id,
        })

        if(user.step == "0") {
            await bot.sendMessage(user_id, "Sherik uchun \nHozir sizga birnecha savollar beriladi.\nHar biriga javob bering.\nOxirida agar hammasi to`g`ri bo`lsa, HA tugmasini bosing va \narizangiz Adminga yuboriladi.")

            let keyboard = {
                resize_keyboard: true,
                keyboard: [
                    [
                        {
                            text: "⬅️Ortga"
                        },
                    ],
                ]
            }

            await bot.sendMessage(user_id, "Ism, familiyangizni kiriting?", {
                reply_markup: keyboard,
            })

            await users.findOneAndUpdate({
                user_id, 
            }, {  
                step: "invest#0",
                menu: "partner",
            })
        } else if(text == "⬅️Ortga") {
            await users.findOneAndUpdate({
                user_id,
            }, {
                menu: 0,
                step: 0,
            })

            await applications.findOneAndDelete({
                user_id: user.id,
            })

            await MenuController(bot, message)    
        } else if(user.step == "invest#0") {
            await applications.create({
                id: v4(),
                user_id: user.id,
                name: text,
            })

            await bot.sendMessage(user_id, "Bog'lanish uchun telefon raqam")

            await users.findOneAndUpdate({
                user_id,
            }, {  
                step: "invest#1"
            })
        } else if(user.step == "invest#1") {
            await applications.findOneAndUpdate({
                user_id: user.id,
            }, {
                phone: text,
            })
            
            await bot.sendMessage(user_id, "Loyiha yo'nalishi")

            await users.findOneAndUpdate({
                user_id,
            }, {
                step: "invest#2"
            })
        } else if(user.step == "invest#2") {
            await applications.findOneAndUpdate({
                user_id: user.id,
            }, {
                direction: text,
            })

            await bot.sendMessage(user_id, "Loyiha haqida yozing")

            await users.findOneAndUpdate({
                user_id,
            }, {
                step: "invest#3"
            })
        } else if(user.step == "invest#3") {
            await applications.findOneAndUpdate({
                user_id: user.id,
            }, {
                description: text,
            })

            await bot.sendMessage(user_id, "Qancha sarmoya kerak?")

            await users.findOneAndUpdate({
                user_id,
            }, {
                step: "invest#4"
            })
        } else if(user.step == "invest#4") {
            await applications.findOneAndUpdate({
                user_id: user.id,
            }, {
                capital: text,
            })

            await bot.sendMessage(user_id, "Investorlar uchun qancha foiz taklif qilasiz?")

            await users.findOneAndUpdate({
                user_id,
            }, {
                step: "invest#5"
            })
        } else if(user.step == "invest#5") {
            await applications.findOneAndUpdate({
                user_id: user.id,
            }, {
                percent: text,
            })

            await bot.sendMessage(user_id, "Yillik daromadi qancha?")

            await users.findOneAndUpdate({
                user_id,
            }, {
                step: "invest#6"
            })
        } else if(user.step == "invest#6") {
            await applications.findOneAndUpdate({
                user_id: user.id,
            }, {
                income: text,
            })
            
            let app = await  applications.findOne({
                user_id: user.id,
            })

            let keyboard = {
                resize_keyboard: true,
                keyboard: [
                    [
                        {
                            text: "Ha✅"
                        },
                        {
                            text: "Yo'q❎"
                        }
                    ]
                ]
            }

            await bot.sendMessage(user_id, `<b>Sherik kerak:</b>\n<b>👨‍💼Ism:</b> ${user.name}\n<b>📞 Aloqa:</b> ${app.phone}\n<b>🇺🇿Telegram:</b> @${user.username}\n<b>🏢Loyiha yo'nalishi:</b> ${app.direction}\n<b>🔎Loyiha haqida:</b> ${app.description}\n<b>💰Sarmoya:</b> ${app.capital}\n<b>📊Investor uchun foiz</b>: ${app.percent}\n<b>📈Yillik daromadi</b>: ${app.income}`, {
                reply_markup: keyboard,
                parse_mode: "HTML",
            })

            await users.findOneAndUpdate({
                user_id,
            }, {
                step: "invest#7"
            })
        } else if(user.step == "invest#7") {
            if(text == "Ha✅") {
                let app = await applications.findOneAndUpdate({
                    user_id: user.id,
                }, {
                    income: text,
                })

                await users.findOneAndUpdate({
                    user_id,
                }, {
                    menu: 0,
                    step:0,
                })

                await bot.sendMessage(1383785054, `<b>Sherikkerak:</b>\n<b>👨‍💼Ism:</b> ${user.name}\n<b>📞 Aloqa:</b> ${app.phone}\n<b>🇺🇿Telegram:</b> @${user.username}\n<b>🏢Loyiha yo'nalishi:</b> ${app.direction}\n<b>🔎Loyiha haqida:</b> ${app.description}\n<b>💰Sarmoya:</b> ${app.capital}\n<b>📊Investor uchun foiz</b>: ${app.percent}\n<b>📈Yillik daromadi</b>: ${app.income}\n\n#partner`, {
                    parse_mode: "HTML",
                })

                await bot.sendMessage(user_id, "Arizangiz adminlarga jo'natildi")
                
                await applications.findOneAndDelete({
                    user_id:user.id,
                })

                await MenuController(bot, message)
            } else if(text == "Yo'q❎") {
                await applications.findOneAndDelete({
                    user_id: user.id,
                })

                await users.findOneAndUpdate({
                    user_id,
                }, {
                    step: 0,
                    menu: 0,
                })

                await bot.sendMessage(user_id, "Ariza bekor qilindi")
                await MenuController(bot, message)
            }
        }
    } catch(e) {
        console.log(e)
    }
}