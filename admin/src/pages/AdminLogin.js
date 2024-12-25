import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/foodcourtlogo.png";
import "./AdminLogin.scss";

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Hardcoded credentials for admin
        if (credentials.username === "admin" && credentials.password === "admin@123") {
            // Set login flag in localStorage
            localStorage.setItem("adminLoggedIn", "true");

            // Redirect to MenuManagement
            navigate("/MenuManagement");
            window.location.reload(); // Force re-render after login
        } else {
            // Show error for invalid credentials
            setError("Invalid username or password");
        }
    };

    return (
        <div className="admin-login-container">
            <div className="logo-container">
                <img src={Logo} alt="Food Court Logo" className="logo" />
            </div>
            <h1>Admin Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="login-button">
                    Login
                </button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default AdminLogin;
