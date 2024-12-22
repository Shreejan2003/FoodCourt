import React from "react";
import Logo from "../assets/foodcourtlogo.png";
import { Link } from "react-router-dom";
import Menuicon from "../assets/Menuicon.svg";
import Ordericon from "../assets/ordericon.svg";
import profileicon from "../assets/profile.svg";
import analysisicon from "../assets/analyticsicon.svg";
import "./Navbar.scss";

function Navbar() {
  return (
    <div className="navbar">
      <div className="topside">
        <img src={Logo} alt="Food Court Logo" />
        <h1>Admin</h1>
      </div>
      {/* <div className="burgercontainer">
        <img src={arrowicon} alt="right arrow" />
        <div className="burgertrigger"></div>
      </div> */}

      <div className="bottomside">
        <ul>
          <li className="active">
            <img src={Menuicon} alt="Menu icon" />
            <Link to="/MenuManagement">Menu Management</Link>
          </li>
          <li>
            <img src={Ordericon} alt="Order icon" />
            <Link to="/OrderMonitoring">Order Monitoring</Link>
          </li>
          <li>
            <img src={profileicon} alt="Profile icon" />
            <Link to="/CustomerInfo">Customer Info</Link>
          </li>
          <li>
            <img src={analysisicon} alt="Analysis icon" />
            <Link to="/Analytics">Analytics</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
