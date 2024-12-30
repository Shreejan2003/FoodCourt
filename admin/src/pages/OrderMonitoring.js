import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OrderMonitoring.scss";

const OrderMonitoring = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const fetchOrders = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/orders/all", {
                headers: {
                    Authorization: `Bearer admin-hardcoded-token`,
                },
            });
            setOrders(response.data.data);
        } catch (error) {
            console.error("Error fetching orders:", error.response?.data || error.message);
        }
    };

    const handleCall = async (userId) => {
        try {
            await axios.post(
                "http://localhost:5000/api/notifications",
                { userId, message: "Your order is ready for pickup." },
                {
                    headers: {
                        Authorization: `Bearer admin-hardcoded-token`,
                    },
                }
            );
            alert("User has been notified successfully!");
        } catch (error) {
            console.error("Error sending notification:", error.response?.data || error.message);
            alert("Failed to notify the user.");
        }
    };

    const handleMarkAsReceived = async (orderId) => {
        try {
            await axios.delete(`http://localhost:5000/api/orders/${orderId}`, {
                headers: {
                    Authorization: `Bearer admin-hardcoded-token`,
                },
            });
            setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
            if (selectedOrder && selectedOrder._id === orderId) {
                setSelectedOrder(null);
            }
            alert("Order marked as received and removed from the database.");
        } catch (error) {
            console.error("Error marking order as received:", error.response?.data || error.message);
            alert("Failed to mark the order as received.");
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="order-monitoring">
            <h1>Order Monitoring</h1>
            <table className="orders-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>User</th>
                        <th>Total Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.userId?.username || "Unknown User"}</td>
                            <td>{order.totalPrice}</td>
                            <td>
                                <button className="view-btn" onClick={() => setSelectedOrder(order)}>View</button>
                                <button className="received-btn" onClick={() => handleMarkAsReceived(order._id)}>
                                    Mark as Received
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedOrder && (
                <div className="order-details">
                    <h2>Order Details</h2>
                    <p>
                        <strong>Order ID:</strong> {selectedOrder._id}
                    </p>
                    <p>
                        <strong>User:</strong> {selectedOrder.userId?.username || "Unknown User"}
                    </p>
                    <p>
                        <strong>Total Price:</strong> {selectedOrder.totalPrice}
                    </p>
                    <table className="order-items-table">
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedOrder.items.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.menuItemId?.name || "Unknown Item"}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.menuItemId?.price || 0}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="order-actions">
                        <button className="call-btn" onClick={() => handleCall(selectedOrder.userId)}>
                            Notify User
                        </button>
                        <button className="received-btn" onClick={() => handleMarkAsReceived(selectedOrder._id)}>
                            Mark as Received
                        </button>
                        <button className="close-btn" onClick={() => setSelectedOrder(null)}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderMonitoring;
