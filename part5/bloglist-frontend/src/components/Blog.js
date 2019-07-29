import React, { useState } from 'react'
import '../index.css'

const Blog = ({ blog }) => {
  const [expandedBlog, setExpandedBlog] = useState(false)
  const showFullBlog = {display: expandedBlog ? '' : 'none'}
  const hideFullBlog = {display: expandedBlog ? 'none' : ''}

  const toggleBlogExpansion = () => {
    setExpandedBlog(!expandedBlog)
  }

  return (
    <div className="blog">
      <div>
        <p>{blog.title}</p>
        <div style={showFullBlog}>
          <p>{blog.author}</p>
          <p>{blog.url}</p>
          <p>{blog.likes} <button>like</button></p>
        </div>
      </div>
      <div style={showFullBlog}>
        <button onClick={toggleBlogExpansion}>hide</button>
      </div>
      <div style={hideFullBlog}>
        <button onClick={toggleBlogExpansion}>show more</button>
      </div>
    </div>
  )
}
export default Blog