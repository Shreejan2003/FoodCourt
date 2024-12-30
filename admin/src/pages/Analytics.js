import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import { Bar, Doughnut } from "react-chartjs-2";
import "./Analytics.scss";

const Analytics = () => {
  const [popularItems, setPopularItems] = useState([]);
  const [orderStats, setOrderStats] = useState({ activeMenus: 0, inactiveMenus: 0 });
  const [totalOrdersOfDay, setTotalOrdersOfDay] = useState(0);
  const [error, setError] = useState("");

  const adminToken = "admin-hardcoded-token";

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [popularResponse, menuStatusResponse, dailyOrdersResponse] = await Promise.all([
          axios.get("http://localhost:5000/api/orders/analytics/popular-menu-items", {
            headers: { Authorization: `Bearer ${adminToken}` },
          }),
          axios.get("http://localhost:5000/api/orders/analytics/menu-status", {
            headers: { Authorization: `Bearer ${adminToken}` },
          }),
          axios.get("http://localhost:5000/api/orders/analytics/total-orders-day", {
            headers: { Authorization: `Bearer ${adminToken}` },
          }),
        ]);

        setPopularItems(popularResponse.data.data);
        setOrderStats(menuStatusResponse.data.data);
        setTotalOrdersOfDay(dailyOrdersResponse.data.totalOrders);
        setError("");
      } catch (error) {
        console.error("Error fetching analytics:", error.response?.data || error.message);
        setError("Failed to fetch analytics data. Please try again.");
      }
    };

    fetchAnalytics();
  }, []);

  const popularItemsData = {
    labels: popularItems.map((item) => item.name),
    datasets: [
      {
        label: "Popular Menu Items",
        data: popularItems.map((item) => item.count),
        backgroundColor: ["#6d0000", "#007bff", "#ffc107", "#28a745", "#ff5733"],
        borderWidth: 1,
      },
    ],
  };

  const orderStatsData = {
    labels: ["Total Orders Today", "Active Menus", "Inactive Menus"],
    datasets: [
      {
        label: "Order and Menu Stats",
        data: [totalOrdersOfDay, orderStats.activeMenus, orderStats.inactiveMenus],
        backgroundColor: ["#6d0000", "#28a745", "#dc3545"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="analytics-page">
      <h1>Analytics Dashboard</h1>
      {error && <p className="error-message">{error}</p>}

      <div className="charts-container">
        <div className="chart">
          <h2>Popular Menu Items</h2>
          <Bar data={popularItemsData} />
        </div>

        <div className="chart">
          <h2>Order and Menu Statistics</h2>
          <Doughnut data={orderStatsData} />
        </div>
      </div>

      <div className="summary">
        <h2>Total Orders Today: {totalOrdersOfDay}</h2>
      </div>
    </div>
  );
};

export default Analytics;
