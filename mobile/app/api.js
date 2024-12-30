import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosRetry from "axios-retry";

const api = axios.create({
  baseURL: process.env.API_BASE_URL || "http://192.168.1.7:5000/api", // Use environment variable or fallback
});

// Automatically retry failed network requests
axiosRetry(api, { retries: 3, retryCondition: (error) => error.code === "ECONNABORTED" });

// Add token to every request
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  console.log("Token being sent:", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle unauthorized errors globally
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized request - Logging out user.");
      await logout();
    }
    return Promise.reject(error);
  }
);

export const setAuthToken = async (token) => {
  try {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await AsyncStorage.setItem("token", token);
    } else {
      delete api.defaults.headers.common["Authorization"];
      await AsyncStorage.removeItem("token");
    }
  } catch (error) {
    console.error("Error setting auth token:", error);
  }
};

export const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    return token;
  } catch (error) {
    console.error("Error retrieving auth token:", error);
    return null;
  }
};

export const logout = async () => {
  try {
    delete api.defaults.headers.common["Authorization"];
    await AsyncStorage.removeItem("token");
  } catch (error) {
    console.error("Error during logout:", error);
  }
};

// Fetch user info
export const getUserInfo = async () => {
  try {
    const response = await api.get("/users/me");
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error.message);
    throw error;
  }
};

// Register user
export const registerUser = async (userData) => {
  try {
    console.log("Registering user with data:", userData);
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Login user
export const loginUser = async (userData) => {
  try {
    console.log("Logging in user with data:", userData);
    const response = await api.post("/auth/login", userData);
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Place an order
export const placeOrder = async (orderData) => {
  try {
    console.log("Placing order with data:", orderData);
    const response = await api.post("/orders/place", orderData);
    return response.data;
  } catch (error) {
    console.error("Error placing order:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Fetch menu items
export const getMenuItems = async (menuType) => {
  try {
    console.log("Fetching menu items for type:", menuType);
    const response = await api.get(`/menu${menuType ? `?menuType=${menuType}` : ""}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching menu items:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Fetch notifications for the authenticated user
export const getNotifications = async () => {
  try {
    const response = await api.get("/notifications");
    return response.data; // Ensure this matches the backend response structure
  } catch (error) {
    console.error("Error fetching notifications:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Mark a notification as read
export const markNotificationAsRead = async (notificationId) => {
  try {
    const response = await api.patch(`/notifications/${notificationId}/read`);
    return response.data;
  } catch (error) {
    console.error("Error marking notification as read:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Send a notification (for admin or testing purposes)
export const sendNotification = async (notificationData) => {
  try {
    console.log("Sending notification with data:", notificationData);
    const response = await api.post("/notifications", notificationData);
    return response.data;
  } catch (error) {
    console.error("Error sending notification:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

export default api;
