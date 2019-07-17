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
        return Math.max(a,b)
    },0)
    : 0;
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog, 
}