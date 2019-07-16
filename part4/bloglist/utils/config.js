require('dotenv').config( {path: './config.env' })

let MONGODB_URI = process.env.MONGODB_URI
let PORT = process.env.PORT

module.exports = {
    MONGODB_URI,
    PORT
}