import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";
import api from "../utils/api";
import "./Analytics.scss";

const Analytics = () => {
  const [popularItems, setPopularItems] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [menuStatus, setMenuStatus] = useState({ active: 0, inactive: 0 });
  const [error, setError] = useState("");

  const COLORS = ["#0088FE", "#FF8042"]; // Colors for Pie Chart

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        // Fetch popular menu items
        const popularResponse = await api.get("/analytics/popular-items");
        setPopularItems(popularResponse.data.data);

        // Fetch total orders
        const ordersResponse = await api.get("/analytics/total-orders");
        setTotalOrders(ordersResponse.data.totalOrders);

        // Fetch active vs inactive menu items
        const menuResponse = await api.get("/analytics/menu-status");
        setMenuStatus(menuResponse.data.data);

        setError("");
      } catch (err) {
        console.error("Error fetching analytics data:", err.message);
        setError("Failed to fetch analytics data. Please try again.");
      }
    };

    fetchAnalyticsData();
  }, []);

  return (
    <div className="analytics-container">
      <h1>Analytics</h1>
      {error && <p className="error-message">{error}</p>}

      {/* Popular Menu Items Bar Chart */}
      <div className="chart-container">
        <h2>Popular Menu Items</h2>
        <BarChart width={600} height={300} data={popularItems}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </div>

      {/* Total Orders */}
      <div className="total-orders">
        <h2>Total Orders</h2>
        <p>{totalOrders}</p>
      </div>

      {/* Active vs Inactive Menu Items Pie Chart */}
      <div className="chart-container">
        <h2>Menu Availability</h2>
        <PieChart width={400} height={400}>
          <Pie
            data={[
              { name: "Active", value: menuStatus.active },
              { name: "Inactive", value: menuStatus.inactive },
            ]}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            <Cell fill={COLORS[0]} />
            <Cell fill={COLORS[1]} />
          </Pie>
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default Analytics;
