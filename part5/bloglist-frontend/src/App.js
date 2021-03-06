import React, { useState, useEffect } from "react";
import "../src/index.css";

import loginService from "./services/login";
import serviceBlogs from "./services/blogs";

import Input from "./components/Input";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";

import { useFieldChange } from './hooks/index'


const App = () => {

  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [URL, setURL] = useState("");

  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState("");

  const usernameField = useFieldChange();
  const passwordField = useFieldChange();

  useEffect(() => {
    async function fetchData(){
      const blogs = await serviceBlogs.getAll();
      setBlogs(blogs);
    }
    fetchData();

    const signedUserToken = window.localStorage.getItem("signedUserToken");
    if (signedUserToken) {
      const user = JSON.parse(signedUserToken);
      setUser(user);
      serviceBlogs.setToken(user.token);
    }
  }, []);


  const blogsToShow = user === null ?
    [] :
    blogs.filter(blog => user.username === blog.author || user.name === blog.author)
      .sort((a, b) => b.likes - a.likes);



  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const credentials = {
        username: usernameField.value,
        password: passwordField.value
      }
      const userWithToken = await loginService.login(credentials);
      window.localStorage.setItem("signedUserToken", JSON.stringify(userWithToken));
      serviceBlogs.setToken(userWithToken.token);

      setUser(userWithToken);
      usernameField.setToDefault();
      passwordField.setToDefault();
    }
    catch (ex) {
      console.log(ex);
      getNotification("Wrong username of password", "red");
    }
    passwordField.setToDefault();
  };

  const publishBlog = async (event) => {
    event.preventDefault();
    try {
      const newBlog = await serviceBlogs.publish({ "title": title, "author": author, "url": URL });
      setBlogs(blogs.concat(newBlog));
      getNotification(`${title} has been posted`, "green");
    }
    catch (ex) {
      console.log(ex);
      console.log(user);
      getNotification("Something went wrong. Please try again", "red");
    }
    setAuthor("");
    setTitle("");
    setURL("");
  };

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };
  const onChangeAuthor = (event) => {
    setAuthor(event.target.value);
  };
  const onChangeURL = (event) => {
    setURL(event.target.value);
  };

  const signOut = () => {
    const signedUserToken = window.localStorage.getItem("signedUserToken");
    if (signedUserToken) {
      window.localStorage.removeItem("signedUserToken");
      window.location.reload();
    }
    return;
  };

  const getNotification = (message, type) => {
    setNotification(message);
    setNotificationType(type);
    setTimeout(() => {
      setNotification(null);
      setNotificationType("black");
    }, 2000);
  }

  const loginForm = () => {

    return (
      <>
        <Togglable buttonLabel={"Sign in"}>
          <div>
            <LoginForm handleSubmit={handleLogin}
              handleUsernameChange={usernameField.onChange}
              handlePasswordChange={passwordField.onChange}
              username={usernameField.value}
              password={passwordField.value} />
          </div>
        </Togglable>
      </>
    );
  };

  const rows = (user) => {
    return blogsToShow.map(blog =>
      <Blog key={blog.id} blog={blog} enableRemoveButton={blog.user.id === user.id ? true : false} />
    )
      .sort((a, b) => a.likes - b.likes);
  };

  const blogsForm = (user) => (
    <>
      <div>
        <h2>{user.name} <button onClick={signOut}>Sign out</button></h2>
      </div>
      <Togglable buttonLabel={"new blog"}>
        <div>
          <h3>Make a new blog</h3>
          <form onSubmit={publishBlog}>
            <Input name={"title"} placeholder={"Title"} onChangeFunc={onChangeTitle} />
            <Input name={"author"} placeholder={"Author"} onChangeFunc={onChangeAuthor} />
            <Input name={"URL"} placeholder={"URL"} onChangeFunc={onChangeURL} />
            <button type="submit">Publish</button>
          </form>
        </div>
      </Togglable>

      <h2>All posts</h2>
      <div>
        {rows(user)}
      </div>
    </>
  );

  return (
    <>
      <Notification message={notification} colortype={notificationType} />
      {user === null ? loginForm() : blogsForm(user)}
    </>
  );
};

export default App;
