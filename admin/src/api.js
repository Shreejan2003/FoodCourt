import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api", // Replace with your backend URL
    headers: {
        "Content-Type": "application/json",
    },
});

// Automatically attach admin token for all requests
api.interceptors.request.use((config) => {
    const adminToken = "admin-hardcoded-token"; // Hardcoded token for admin
    config.headers.Authorization = `Bearer ${adminToken}`;
    return config;
});

export default api;
