const mongoose = require("mongoose")
const uniqueValidator = require('mongoose-unique-validator')


const userSchema = mongoose.Schema({
    username: {
        type: String,
        minlength: 3,
        unique: true,
        required: true
    },
    name: String,
    passwordHash: String,
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog"
        }
    ],
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
        delete returnedObj.passwordHash
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User