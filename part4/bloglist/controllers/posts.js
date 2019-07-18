const blogsRouter = require('express').Router()
const Blog = require('../models/post')

blogsRouter.get('/', async (request, response) => {
    try {
        const blogs = await Blog.find({})
        return response.json(blogs)
    }
    catch (exception) {
        next(exception)
    }
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    try {
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)
    }
    catch (exception) {
        next(exception)
    }
})

blogsRouter.get('/:id', async (request, response) => {
    try {
        const blog = await Blog.findById(request.params.id)
        return response.json(blog)
    }
    catch (expection) {
        console.log('Error', expection)
        response.status(404).end()
    }
})

module.exports = blogsRouter

