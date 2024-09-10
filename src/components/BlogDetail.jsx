import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import blogService from "../services/blogs";

const BlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [newComment, setNewComment] = useState("");

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

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleAddComment = async () => {
        try {
            const updatedBlog = await blogService.addComment(id, newComment);
            setBlog(updatedBlog);
            setNewComment("");
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    if (!blog) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{blog.title}</h2>

            <a href={blog.url}>{blog.url}</a>
            <p>{blog.likes} likes</p>
            <p>added by {blog.author}</p>

            <h2>comments</h2>
            <div style={{ display: "flex", gap: "10px" }}>
                <input type="text" value={newComment} onChange={handleCommentChange} placeholder="Add a comment" />
                <button onClick={handleAddComment}>add comment</button>
            </div>

            <ul>
                {blog.comments.map((comment, index) => (
                    <li key={index}>{comment}</li>
                ))}
            </ul>
        </div>
    );
};

export default BlogDetail;
