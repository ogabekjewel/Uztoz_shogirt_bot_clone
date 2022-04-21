const mongoose = require("mongoose")
const { MONGO_URL } = require("../../config")

require("./UserModel")
require("./ApplicationModel")

module.exports = async () => {
    try {
        await mongoose.connect(MONGO_URL)
        console.log("MONGO CONNECT")
    } catch(e) {
        console.log("MONGO FAILED" + e)
    }
}