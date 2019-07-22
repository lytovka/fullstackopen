const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const loginRouter = require('express').Router()

loginRouter.post('/', async (req, res) => {
    const body = require.body

    const user = await User.findOne({ username: body.username })
    const userPassword = user === null ? false
        : await bcrypt.compare(body.password, user.passwordHash)

    if (!(user && userPassword)) {
        return res.status(401).json({ error: 'invalid name or username' })
    }

    const userForToken = {
        username: user.username,
        id: user.id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    response
        .status(200)
        .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter