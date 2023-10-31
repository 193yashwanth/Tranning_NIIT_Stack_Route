const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    }
})

const UserModels = mongoose.model("users", UserSchema)
module.exports = UserModels