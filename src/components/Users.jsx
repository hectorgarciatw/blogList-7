import { useState, useEffect } from "react";
import userService from "../services/users";

const Users = () => {
    const [users, setUsers] = useState([]);

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
                            <td>{user.username}</td>
                            <td>{user.blogs}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
