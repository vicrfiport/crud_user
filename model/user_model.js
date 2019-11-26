const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = new Schema({

    nama: {
        type: String,
        default: null,
        //test

    }, 
    email: { 
         
        type: String,
        default: null,
        unique: true
},
    phone: {
        type: String,
        default: null,
        unique: true
    },
    username: {
        type: String,
        default: null,
        unique: true
    },
    gender: String,
    password: {

        type: String,
        default: null
    },
    created_at:{

        type: Date,
        default: Date.now()
    },
    activated_at: {
        type: Date,
        default: null
    },
    activation_token: {
        type: String,
        default: null
    },
    updated_at: {
        type: Date,
        default: Date.now()

    },
    deleted_at: {
        type: Date,
        default: null
    }
})

let User = mongoose.model("User", userSchema)

module.exports = User


    

    

