const blogsRouter = require('express').Router()
const Blog = require('../models/post')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

blogsRouter.get('/', async (request, response) => {
    const blog = new Blog(request.body)
    const likes = Object.keys(blog).find(key => key === "likes")
    if (!likes) {
        blog.likes = 0;
    }
    try {
        const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })
        return response.json(blogs)
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

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
    request.token = getTokenFrom(request)
    console.log(request.token)
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!request.token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        const user = await User.findById(body.userId)
        console.log(body.userId)
        const blog = new Blog({
            user: user.id,
            author: body.author,
            title: body.title,
            url: body.url,
            likes: body.likes
        })

        if (!blog.likes) {
            blog.likes = 0;
        }

        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog.id)
        await user.save()
        response.status(201).json(savedBlog)
    }
    catch (exception) {
        response.status(400).end()
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const blogToUpdate = {
        ...request.body
    }
    try {
        await Blog.findByIdAndUpdate(request.params.id, blogToUpdate, { new: true })
        response.json(blogToUpdate)
    }
    catch (ex) {
        console.log(ex)
        response.status(400).end()
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    const body = request.body
    request.token = getTokenFrom(request)

    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!request.token || !decodedToken.id) {
            return response.status(401).json({ error: "Token was malformed or not found" })
        }

        const blog = await Blog.findById(request.params.id)
        // console.log(blog.user.toString(), body.userId)
        if(blog.user.toString() === body.userId){
            await blog.delete()
            return response.status(204).json({message: "The post has been sucessfully deleted"})
        }
    }
    catch (ex) {
        response.status(400).end()
    }
})

module.exports = blogsRouter

