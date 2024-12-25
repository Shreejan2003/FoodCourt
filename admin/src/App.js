import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import AdminLogin from "./pages/AdminLogin";
import MenuManagement from "./pages/MenuManagement";
import CustomerInfo from "./pages/CustomerInfo";
import OrderMonitoring from "./pages/OrderMonitoring";
import Analytics from "./pages/Analytics";
import FoodList from "./pages/FoodList";

function App() {
    // Check admin login state from localStorage
    const isAdminLoggedIn = localStorage.getItem("adminLoggedIn") === "true";

    return (
        <>
            {/* Show Navbar only when admin is logged in */}
            {isAdminLoggedIn && <Navbar />}
            <div className="container">
                <Routes>
                    {!isAdminLoggedIn ? (
                        <>
                            {/* Redirect all unauthenticated routes to login */}
                            <Route path="/login" element={<AdminLogin />} />
                            <Route path="*" element={<Navigate to="/login" />} />
                        </>
                    ) : (
                        <>
                            {/* Redirect root path to MenuManagement */}
                            <Route path="/" element={<Navigate to="/MenuManagement" />} />
                            <Route path="/MenuManagement" element={<MenuManagement />} />
                            <Route path="/CustomerInfo" element={<CustomerInfo />} />
                            <Route path="/OrderMonitoring" element={<OrderMonitoring />} />
                            <Route path="/Analytics" element={<Analytics />} />
                            <Route path="/FoodList" element={<FoodList />} />
                            <Route path="*" element={<Navigate to="/MenuManagement" />} />
                        </>
                    )}
                </Routes>
            </div>
        </>
    );
}

export default App;
