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
    test('blogs are returned as json', async () => {
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
})

afterAll(() => {
    mongoose.connection.close()
})