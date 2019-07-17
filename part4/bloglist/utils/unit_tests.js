const _ = require('lodash')

const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    return blogs.length > 0 ? blogs.reduce((sum, item) => {
        return sum + item;
    }, 0)
        : 0;
}

const favoriteBlog = (blogs) => {
    return blogs.length > 0 ? blogs.reduce((a, b) => {
        return Math.max(a, b)
    }, 0)
        : 0;
}

const mostBlogs = (blogs) => {
    const newObj = _.countBy(blogs.map(blog => blog.author))
    const author = Object.keys(newObj).reduce((a, b) => {
        return newObj[a] > newObj[b] ? a : b
    })
    return {
        "author": author,
        "blogs": newObj[author]
    }
}

const mostLikes = (blogs) => {
    
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
}