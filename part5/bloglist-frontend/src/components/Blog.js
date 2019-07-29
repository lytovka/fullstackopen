import React, { useState } from 'react'
import serviceBlog from '../services/blogs'
import '../index.css'

const Blog = ({ blog, enableRemoveButton }) => {
  const [likes, setLikes] = useState(blog.likes)
  const [expandedBlog, setExpandedBlog] = useState(false)
  const showFullBlog = { display: expandedBlog ? '' : 'none' }
  const hideFullBlog = { display: expandedBlog ? 'none' : '' }
  const toggleBlogExpansion = () => {
    setExpandedBlog(!expandedBlog)
  }
  
  const likeButton = async (blog, id) => {
    try {
      await serviceBlog.putLike(blog, id)
      setLikes(likes + 1)
    }
    catch (ex) {
      console.log("couldn't update likes", ex)
    }
  }

  const deleteBlog = async (blogId, userId) => {
    console.log('test', blogId)
    const response = window.confirm(`Delete this post?`);
    if (response) {
      try {
        await serviceBlog.deletePost(blogId, userId)
        window.location.reload()
      }
      catch (ex) {
        console.log("can't delete the post", ex)
      }
    }
  }

  return (
    <div className="blog">
      <div>
        <p>{blog.title}</p>
        <div style={showFullBlog}>
          <p>{blog.author}</p>
          <p>{blog.url}</p>
          <p>{likes} <button onClick={() => likeButton({ "title": blog.title, "author": blog.author, "url": blog.url, "likes": blog.likes }, blog.id)}>like</button></p>
        </div>
      </div>
      <div style={showFullBlog}>
        <button onClick={toggleBlogExpansion}>hide</button>
        {!enableRemoveButton && <button onClick={() => deleteBlog(blog.id, blog.user.id)}>remove</button>}
      </div>
      <div style={hideFullBlog}>
        <button onClick={toggleBlogExpansion}>show more</button>
      </div>
    </div>
  )
}
export default Blog