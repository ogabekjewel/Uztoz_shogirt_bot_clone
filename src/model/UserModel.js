const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
    },
    user_id: {
        type: String,
        unique: true,
        required: true,
    },
    name:  {
        type: String,
        unique: true,
    },
    username: {
        type: String,
    },
    step: {
        type: String,
        default: 0,
        required: true,
    }, 
    menu: {
        type: String,
        default: 0,
    }
})

const users = mongoose.model("users", UserSchema)

module.exports = users
