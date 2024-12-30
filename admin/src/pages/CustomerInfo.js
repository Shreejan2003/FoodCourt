import React, { useState, useEffect } from "react";
import api from "../utils/api";
import "./CustomerInfo.scss";

function CustomerInfo() {
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [pointsToAddMap, setPointsToAddMap] = useState({}); // Object to store points for each user
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const adminToken = "admin-hardcoded-token"; // Hardcoded admin token

    // Fetch all customers
    const fetchCustomers = async () => {
        try {
            const response = await api.get("/users", {
                headers: { Authorization: `Bearer ${adminToken}` },
            });
            setCustomers(response.data.data);
            setFilteredCustomers(response.data.data);
            setError("");
        } catch (error) {
            console.error("Error fetching customers:", error.message);
            setError("Failed to fetch customer data.");
        }
    };

    // Add points to a user
    const addPoints = async (userId) => {
        const points = pointsToAddMap[userId];
        if (!points || points <= 0) {
            setError("Please enter a valid number of points to add.");
            return;
        }

        try {
            const response = await api.post(
                `/users/add-points`,
                { userId, points: Number(points) },
                {
                    headers: { Authorization: `Bearer ${adminToken}` },
                }
            );
            setSuccess(response.data.message || "Points added successfully!");
            setError("");
            setPointsToAddMap((prev) => ({ ...prev, [userId]: "" })); // Reset input for the user
            fetchCustomers(); // Refresh customers
        } catch (error) {
            console.error("Error adding points:", error.message);
            setError("Failed to add points. Please try again.");
            setSuccess("");
        }
    };

    // Search functionality
    const handleSearch = () => {
        const term = searchTerm.toLowerCase();
        setFilteredCustomers(
            customers.filter((customer) =>
                customer.username.toLowerCase().includes(term)
            )
        );
    };

    // Handle input change for points
    const handlePointsChange = (userId, value) => {
        setPointsToAddMap((prev) => ({ ...prev, [userId]: value }));
    };

    // Fetch customers on load
    useEffect(() => {
        fetchCustomers();
    }, []);

    return (
        <div className="customer-info">
            <h1>Customer Information</h1>

            {/* Error and Success Messages */}
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            {/* Search Bar */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search customers by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch} className="search-button">
                    Search
                </button>
            </div>

            {/* Customer Table */}
            <table className="customer-table">
                <thead>
                    <tr>
                        <th>SN</th>
                        <th>Name</th>
                        <th>Total Points</th>
                        <th>Registered Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCustomers.map((customer, index) => (
                        <tr key={customer._id}>
                            <td>{index + 1}</td>
                            <td>{customer.username}</td>
                            <td>{customer.points}</td>
                            <td>{new Date(customer.createdAt).toLocaleDateString()}</td>
                            <td>
                                <input
                                    type="number"
                                    placeholder="Add Points"
                                    value={pointsToAddMap[customer._id] || ""}
                                    onChange={(e) =>
                                        handlePointsChange(customer._id, e.target.value)
                                    }
                                />
                                <button
                                    onClick={() => addPoints(customer._id)}
                                    className="add-points-button"
                                >
                                    Add Points
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CustomerInfo;
