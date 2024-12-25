import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/foodcourtlogo.png";
import Menuicon from "../assets/Menuicon.svg";
import Ordericon from "../assets/ordericon.svg";
import profileicon from "../assets/profile.svg";
import analysisicon from "../assets/analyticsicon.svg";
import foodlisticon from "../assets/foodlisticon.svg"; // Added Food List Icon
import "./Navbar.scss";

function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("adminLoggedIn");
        navigate("/login");
        window.location.reload(); // Refresh the page after logout
    };

    return (
        <div className="navbar">
            {/* Top Section */}
            <div className="topside">
                <img src={Logo} alt="Food Court Logo" />
                <h1>Admin</h1>
            </div>

            {/* Navigation Links */}
            <div className="bottomside">
                <ul>
                    <li className={location.pathname === "/MenuManagement" ? "active" : ""}>
                        <img src={Menuicon} alt="Menu icon" />
                        <Link to="/MenuManagement">Menu Management</Link>
                    </li>
                    <li className={location.pathname === "/OrderMonitoring" ? "active" : ""}>
                        <img src={Ordericon} alt="Order icon" />
                        <Link to="/OrderMonitoring">Order Monitoring</Link>
                    </li>
                    <li className={location.pathname === "/CustomerInfo" ? "active" : ""}>
                        <img src={profileicon} alt="Profile icon" />
                        <Link to="/CustomerInfo">Customer Info</Link>
                    </li>
                    <li className={location.pathname === "/Analytics" ? "active" : ""}>
                        <img src={analysisicon} alt="Analysis icon" />
                        <Link to="/Analytics">Analytics</Link>
                    </li>
                    <li className={location.pathname === "/FoodList" ? "active" : ""}>
                        <img src={foodlisticon} alt="Food List icon" />
                        <Link to="/FoodList">Food List</Link>
                    </li>
                </ul>
            </div>

            {/* Logout Button */}
            <button className="logout-button" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}

export default Navbar;
