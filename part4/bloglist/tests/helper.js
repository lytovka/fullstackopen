const Blog = require('../models/post')

const initialBlogs = [
    {
        "_id": "5d2d5830e795da1f680ae830",
        "title": "New post",
        "author": "Ivan Lytovka",
        "url": "lytovka.com",
        "likes": 10,
        "__v": 0
    },
    {
        "_id": "5d2d5a20345f853cb495d997",
        "title": "New post from another author",
        "author": "Tema",
        "url": "tema.com",
        "likes": 20,
        "__v": 0
    },
    {
        "_id": "5d2ded04b8bb424c08ca730c",
        "title": "New post from another author",
        "author": "Tanya",
        "url": "tanya.com",
        "likes": 25,
        "__v": 0
    },
    {
        "_id": "5d2dfb9574d1cb47781c12d9",
        "title": "New post from another author",
        "author": "Tanya",
        "url": "tanya.com",
        "likes": 25,
        "__v": 0
    }
]

module.exports = {
    initialBlogs
}