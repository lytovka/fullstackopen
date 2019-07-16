const app = require('express')
const config = require('./utils/config')
const blogsRouter = require('express').Router()
const bodyParser = require('body-parser')
const cors = require('cors')
const Blog = require('./models/post')

blogsRouter.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

app.use('/api/blogs', blogsRouter)
app.use(cors())
app.use(bodyParser.json())

module.exports = app

