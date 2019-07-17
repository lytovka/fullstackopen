const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe("Testing backend", () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, 6000)
    test("There should be 4 blogs at this point", async () => {
        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(4)
    })
    test("Ivan Lytovka is the author of the first blog", async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].author).toBe("Ivan Lytovka")
    }) 
})

afterAll(() => {
    mongoose.connection.close()
})