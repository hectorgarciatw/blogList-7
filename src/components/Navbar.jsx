import { Link } from "react-router-dom";

const Navbar = ({ user, handleLogout }) => {
    return (
        <nav style={{ display: "flex", gap: "10px", padding: "10px", borderBottom: "1px solid #ccc" }}>
            <Link to="/">Blogs</Link>
            <Link to="/users">Users</Link>
            {user && (
                <span>
                    <strong>{user.name}</strong> logged in
                    <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
                        Logout
                    </button>
                </span>
            )}
        </nav>
    );
};

export default Navbar;
