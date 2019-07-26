import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import serviceBlogs from './services/blogs'
import Input from './components/Input'
import Blog from './components/Blog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [URL, setURL] = useState('')

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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem("signedUserToken", JSON.stringify(user))

      serviceBlogs.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (ex) {
      console.log("Wrong credentials")
    }
  }

  const publishBlog = async (event) => {
    event.preventDefault()
    try{
      const newBlog = await serviceBlogs.publish({"title": title, "author": author, "url": URL})
      setBlogs(blogs.concat(newBlog))
    }
    catch(ex){
      console.log(ex)
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


  if (user === null) {
    return (
      <>
        {loginForm()}
      </>
    )
  }
  else {
    return (
      <>
        {blogsForm(user)}
      </>
    )
  }

  // return (
  //   <>
  //     {user === null ? loginForm() : blogsForm(user)}
  //   </>
  // );
}

export default App;
