import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import userService from "../services/users";

import { Link } from "react-router-dom";

const UserPosts = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserBlogs = async () => {
            try {
                const user = await userService.getUserBlogs(id);
                if (user && Array.isArray(user.blogs)) {
                    setData(user.blogs);
                } else {
                    console.error("Expected an array of blogs but got:", user.blogs);
                    setError("Error fetching data");
                }
            } catch (error) {
                console.error("Error fetching user blogs:", error);
                setError("Error fetching data");
            } finally {
                setLoading(false);
            }
        };

        fetchUserBlogs();
    }, [id]);

    if (loading) {
        return <div>Loading user details...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Blogs</h1>
            <h3>Added blogs</h3>
            <ul>
                {data.map((blog) => (
                    <li key={blog.id}>
                        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserPosts;
