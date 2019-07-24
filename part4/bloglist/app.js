const config = require('./utils/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const blogRouter = require('./controllers/posts')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

const mongoUrl = config.MONGODB_URI;

(async () => {
    try {
        await mongoose.connect(mongoUrl, { useNewUrlParser: true })
    }
    catch (ex) {
        console.log(ex)
    }
    finally {
        console.log('Connecting to', mongoUrl)
    }
})()

app.use(cors())
app.use(bodyParser.json())

app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.getTokenFrom)


// app.use(middleware.unknownEndpoint)
// app.use(middleware.errorHandler)
module.exports = app