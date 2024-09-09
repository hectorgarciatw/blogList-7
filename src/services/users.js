import axios from "axios";
const baseUrl = "http://localhost:3003/api/users/users";

//Get the users list with the blog counter
const getUsers = () => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
};

//Get the user by id
const getUserBlogs = (id) => {
    const request = axios.get(`${baseUrl}/${id}`);
    return request.then((response) => response.data);
};

export default { getUsers, getUserBlogs };
