import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import serviceBlogs from './services/blogs'
import Blog from './components/Blog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    serviceBlogs.getAll().then(initialBlogs => setBlogs(initialBlogs))
  }, [])

  const blogsToShow = user === null ? [] : blogs.filter(blog => user.username === blog.author || user.name === blog.author)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      console.log(user)
      setUsername('')
      setPassword('')
    }
    catch (ex) {
      console.log("Wrong credentials")
    }
  }

  const loginForm = () => (
    <>
      <div>
        <form onSubmit={handleLogin}>
          <div>
            <input type="text" value={username} placeholder="username" onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
              placeholder="password"
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    </>
  )

  const rows = () => blogsToShow.map(blog =>
    <Blog key={blog.id} blog={blog} />
  )

  const blogsForm = (user) => (
    <>
      <div>
        <h2>{user.name} has been logged in!</h2>
      </div>
      <div>
        {rows()}
      </div>
    </>
  )
  
  return (
    <>
      {user === null ? loginForm() : blogsForm(user)}
    </>
  );
}

export default App;
