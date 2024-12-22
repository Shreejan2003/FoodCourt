import React, { useState, useEffect } from 'react';
import api from '../utils/api'; // Axios instance
import "./CustomerInfo.scss"; // Optional styles

function CustomerInfo() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [orderDetails, setOrderDetails] = useState([]);
  const [pointsToAdd, setPointsToAdd] = useState(0);

  // Fetch all customers
  const fetchCustomers = async () => {
    try {
      const response = await api.get('/users');
      setCustomers(response.data.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  // Fetch order details for a specific customer
  const fetchOrderDetails = async (userId) => {
    try {
      const response = await api.get(`/orders/${userId}`);
      setOrderDetails(response.data.data);
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  // Add points to a customer
  const addPoints = async (userId) => {
    try {
      await api.post(`/users/${userId}/add-points`, { points: pointsToAdd });
      alert('Points added successfully!');
      fetchCustomers(); // Refresh customer list
    } catch (error) {
      console.error('Error adding points:', error);
      alert('Failed to add points.');
    }
  };

  // Fetch customers on component mount
  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="customer-info">
      <h1>Customer Info</h1>
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
          {customers.map((customer, index) => (
            <tr key={customer._id}>
              <td>{index + 1}</td>
              <td>{customer.username}</td>
              <td>{customer.points}</td>
              <td>{new Date(customer.createdAt).toLocaleDateString()}</td>
              <td>
                <button onClick={() => { setSelectedCustomer(customer); fetchOrderDetails(customer._id); }}>
                  View
                </button>
                <input
                  type="number"
                  placeholder="Add Points"
                  value={pointsToAdd}
                  onChange={(e) => setPointsToAdd(Number(e.target.value))}
                />
                <button onClick={() => addPoints(customer._id)}>Add Points</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedCustomer && (
        <div className="order-details">
          <h2>Order Details for {selectedCustomer.username}</h2>
          <ul>
            {orderDetails.map((order) => (
              <li key={order._id}>
                <p>Order ID: {order._id}</p>
                <p>Total Price: ${order.totalPrice}</p>
                <p>Ordered At: {new Date(order.createdAt).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CustomerInfo;
