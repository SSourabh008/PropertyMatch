const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    profileImg:{
        type: String,
    }
}, {timestamps: true})//it will provide the inforemation about when it was created and updated 

module.exports = mongoose.model("User", UserSchema)