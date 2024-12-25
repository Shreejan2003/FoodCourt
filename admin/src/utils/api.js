import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api", // Replace with your backend API URL
    headers: {
        "Content-Type": "application/json",
    },
});

// Add JWT token to Authorization header dynamically
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
