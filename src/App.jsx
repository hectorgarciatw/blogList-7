import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

// Components
import LoginForm from "./components/LoginForm";
import CreateForm from "./components/CreateForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Users from "./components/Users";
import UserPosts from "./components/UserPosts";

const App = () => {
    const baseUrl = "http://localhost:3003/api/blogs";
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const loggedStyle = {
        display: "flex",
        alignItems: "baseLine",
        gap: "10px",
    };

    useEffect(() => {
        blogService.getAll().then((blogs) => {
            const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
            setBlogs(sortedBlogs);
        });
    }, []);

    useEffect(() => {
        const loggedUser = window.localStorage.getItem("loggedUser");
        if (loggedUser) {
            const user = JSON.parse(loggedUser);
            setUser(user);
        }
    }, []);

    const updateBlogOnServer = (id, updatedBlog) => {
        return axios
            .put(`${baseUrl}/${id}/likes`, { likes: updatedBlog.likes })
            .then((res) => res.data)
            .catch((error) => {
                console.error("Error updating blog:", error);
                throw error;
            });
    };

    const deleteBlogOnServer = (id) => {
        return axios
            .delete(`${baseUrl}/${id}`)
            .then((res) => res.data)
            .catch((error) => {
                console.error("Error deleting blog:", error);
                throw error;
            });
    };

    const handleLogin = async (username, password) => {
        try {
            const user = await loginService.login({ username, password });
            setUser(user);
            window.localStorage.setItem("loggedUser", JSON.stringify(user));
        } catch (exception) {
            throw new Error("Wrong credentials");
        }
    };

    const handleLogout = () => {
        window.localStorage.removeItem("loggedUser");
        setUser(null);
        refreshBlogs();
    };

    const refreshBlogs = async () => {
        const blogs = await blogService.getAll();
        const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
        setBlogs(sortedBlogs);
    };

    return (
        <Router>
            <div>
                <h2>Blog list frontend</h2>
                {successMsg && <Notification msg={successMsg} type="success" />}
                {errorMsg && <Notification msg={errorMsg} type="error" />}

                <Routes>
                    <Route
                        path="/"
                        element={
                            !user ? (
                                <LoginForm onLogin={handleLogin} setErrorMsg={setErrorMsg} />
                            ) : (
                                <div>
                                    <div style={loggedStyle}>
                                        <p style={{ fontWeight: "bold" }}>{user.name} logged in</p>
                                        <button onClick={handleLogout}>logout</button>
                                    </div>
                                    <Togglable buttonLabel="new blog">
                                        <CreateForm user={user} setSuccessMsg={setSuccessMsg} setErrorMsg={setErrorMsg} onBlogCreate={refreshBlogs} />
                                    </Togglable>
                                    <br />
                                    {blogs.map((blog) => (
                                        <Blog key={blog.id} blog={blog} updateBlogOnServer={updateBlogOnServer} deleteBlogOnServer={deleteBlogOnServer} refreshBlogs={refreshBlogs} currentUser={user} />
                                    ))}
                                </div>
                            )
                        }
                    />

                    <Route path="/users" element={<Users />} />
                    <Route path="/users/:id" element={<UserPosts />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
