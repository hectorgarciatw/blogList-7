import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import blogService from "../services/blogs"; // Importar el servicio que realiza las solicitudes al backend

const BlogDetail = () => {
    const { id } = useParams(); // Obtener el parámetro de ID de la URL
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const blogData = await blogService.getBlogById(id);
                setBlog(blogData);
            } catch (error) {
                console.error("Error fetching blog:", error);
            }
        };

        fetchBlog();
    }, [id]);

    if (!blog) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{blog.title}</h2>

            <a href={blog.url}>{blog.url}</a>
            <p>{blog.likes} likes</p>
            <p>added by {blog.author}</p>
        </div>
    );
};

export default BlogDetail;
