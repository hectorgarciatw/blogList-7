import { useState, useEffect } from "react";
import userService from "../services/users";

import { Link } from "react-router-dom";

const Users = () => {
    const [users, setUsers] = useState([]);
    const baseUrl = "http://localhost:3003/api/users/users";

    useEffect(() => {
        userService.getUsers().then((initialUsers) => {
            setUsers(initialUsers);
        });
    }, []);

    return (
        <div>
            <h3>USERS</h3>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Blogs Created</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>
                                <Link to={`/users/${user.id}`}>{user.username}</Link>
                            </td>
                            <td>{user.blogs}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
