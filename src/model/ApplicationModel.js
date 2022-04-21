const mongoose = require("mongoose")

const ApplicationSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    name: {
        type: String,   
    },
    phone: {
        type: String,
    },
    direction: {
        type: String,
    },
    description: {
        type: String,
    },
    capital: {
        type: String,
    },
    percent: {
        type: String,
    },
    income: {
        type: String,
    },
})

const applications = mongoose.model("applications", ApplicationSchema)

module.exports = applications
