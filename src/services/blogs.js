import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs";

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
};

const create = (newBlog, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    const request = axios.post(baseUrl, newBlog, config);
    return request.then((response) => response.data);
};

const getBlogById = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
};

//Adding a comment to a blog
const addComment = async (id, comment) => {
    const response = await axios.post(`${baseUrl}/${id}/comments`, { comment });
    return response.data;
};

export default { getAll, create, getBlogById, addComment };
