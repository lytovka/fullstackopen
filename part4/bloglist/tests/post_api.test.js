const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./helper')
const Blog = require('../models/post')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    let blog = new Blog(helper.initialBlogs[0])
    await blog.save()
    blog = new Blog(helper.initialBlogs[1])
    await blog.save()
    blog = new Blog(helper.initialBlogs[2])
    await blog.save()
    blog = new Blog(helper.initialBlogs[3])
    await blog.save()
})

describe("Testing backend", () => {
    test('GET requiest', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, 6000)
    test("There should be 4 blogs at this point", async () => {
        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(helper.initialBlogs.length)
    })
    test("Ivan Lytovka is the author of the first blog", async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].author).toBe("Ivan Lytovka")
    })
    test("Unique identifier", async () => {
        const response = await api.get('/api/blogs')
        expect(Object.keys(response.body[0]).filter(key => key === "id")).toBeDefined()
    })
    test("POST request", async () => {
        const newBlog = {
            title: "testing blog",
            author: "John Fedor",
            url: "jf.com",
            likes: 100
        }
        await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const numBlogs = await helper.blogsInDB()
        expect(numBlogs.length).toBe(helper.initialBlogs.length+1)
    })
    test("POST request without likes property", async () => {
        const newBlog = {
            title: "testing blog",
            author: "John Fedor",
            url: "jf.com"
        }
        await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
        
        const allBlogs = await helper.blogsInDB()
        expect(allBlogs[allBlogs.length-1].likes).toBe(0)
    })
    test("POST request without likes property", async () => {
        const newBlog = {
            title: "testing blog",
            author: "John Fedor",
            url: "jf.com"
        }
        await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
        
        const allBlogs = await helper.blogsInDB()
        expect(allBlogs[allBlogs.length-1].likes).toBe(0)
    })
    test("an empty POST request", async () => {
        const newBlog = {}
        await api.post('/api/blogs')
        .send(newBlog)
        .expect(400)
        
        const allBlogs = await helper.blogsInDB()
        expect(allBlogs.length).toBe(allBlogs.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})