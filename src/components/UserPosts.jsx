import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import userService from "../services/users";

const UserPosts = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        userService.getUserBlogs(id).then((userBlogs) => {
            console.log(`userBlogs:${JSON.stringify(userBlogs)}`);
            setData(userBlogs);
        });
    }, [id]);

    if (!data) {
        return <div>Loading user details...</div>;
    }

    return (
        <div>
            <h1>Blogs</h1>
            <h3>added blogs</h3>
            <ul>
                {data.map((blog) => (
                    <li key={blog.id}>{blog.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserPosts;
