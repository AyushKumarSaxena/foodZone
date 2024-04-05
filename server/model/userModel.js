const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name:{
        type: String, 
        required: true,
        trim: true       
    },
    email:{
        type: String,
        required: true,
        validate: [validator.isEmail, "Enter valid mail"]
    },
    password:{
        type: String,
        required: true
    },
    phone:{
        type:String,
    },
    address:{
        type: String,
    },
})

module.exports = mongoose.model("User", userSchema)