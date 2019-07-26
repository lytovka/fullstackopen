import React, { useState, useEffect } from 'react'
import '../src/index.css'

import loginService from './services/login'
import serviceBlogs from './services/blogs'
import serviceUsers from './services/users'
import Input from './components/Input'
import Blog from './components/Blog'
import Notification from './components/Notification'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [URL, setURL] = useState('')

  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState('');


  useEffect(() => {
    serviceBlogs.getAll().then(initialBlogs => setBlogs(initialBlogs))

    const signedUserToken = window.localStorage.getItem("signedUserToken")
    if (signedUserToken) {
      const user = JSON.parse(signedUserToken)
      setUser(user)
      serviceBlogs.setToken(user.token)
    }
  }, [])

  const blogsToShow = user === null ? [] : blogs.filter(blog => user.username === blog.author || user.name === blog.author)

  // const blogsToShow = user === null ? [] : blogs.filter((blog) => {
  //   return user.id === blog.user.id
  // })

  console.log(user)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userWithToken = await loginService.login({ username, password })
      window.localStorage.setItem("signedUserToken", JSON.stringify(userWithToken))
      serviceBlogs.setToken(userWithToken.token)

      setUser(userWithToken)
      setUsername('')
      setPassword('')
    }
    catch (ex) {
      console.log(ex)
      setNotification('Wrong username or password')
      setNotificationType('red')
      setTimeout(() => {
        setNotification(null);
        setNotificationType("black");
      }, 2000);
    }
  }

  const publishBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await serviceBlogs.publish({ "title": title, "author": author, "url": URL })
      setBlogs(blogs.concat(newBlog))
      setNotification(`${title} has just been posted`)
      setNotificationType('green')
      setTimeout(() => {
        setNotification(null);
        setNotificationType("black");
      }, 5000);
    }
    catch (ex) {
      console.log(ex)
      setNotification('Something went wrong. Please try again')
      setNotificationType('red')
      setTimeout(() => {
        setNotification(null);
        setNotificationType("black");
      }, 2000);
    }
    setAuthor('')
    setTitle('')
    setURL('')
  }

  const onChangeTitle = (event) => {
    setTitle(event.target.value)
  }
  const onChangeAuthor = (event) => {
    setAuthor(event.target.value)
  }
  const onChangeURL = (event) => {
    setURL(event.target.value)
  }

  const signOut = () => {
    const signedUserToken = window.localStorage.getItem("signedUserToken")
    if (signedUserToken) {
      window.localStorage.removeItem("signedUserToken")
      window.location.reload();
    }
    return;
  }

  const loginForm = () => (
    <>
      <div>
        <h1>Sign in</h1>
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
          <button type="submit">Sign in</button>
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
        <h2>{user.name} <button onClick={signOut}>Sign out</button></h2>
      </div>

      <div>
        <h3>Make a new blog</h3>
        <form onSubmit={publishBlog}>
          <Input name={"title"} placeholder={"Title"} onChangeFunc={onChangeTitle} />
          <Input name={"author"} placeholder={"Author"} onChangeFunc={onChangeAuthor} />
          <Input name={"URL"} placeholder={"URL"} onChangeFunc={onChangeURL} />
          <button type="submit">Publish</button>
        </form>
      </div>

      <h2>All posts</h2>
      <div>
        {rows()}
      </div>
    </>
  )


  // if (user === null) {
  //   return (
  //     <>
  //       {loginForm()}
  //     </>
  //   )
  // }
  // else {
  //   return (
  //     <>
  //       {blogsForm(user)}
  //     </>
  //   )
  // }

  return (
    <>
      <Notification message={notification} colortype={notificationType} />
      {user === null ? loginForm() : blogsForm(user)}
    </>
  );
}

export default App;
