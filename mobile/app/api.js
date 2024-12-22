import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "http://192.168.1.73:5000/api", // Update with your backend base URL
});

// Register user
export const registerUser = async (userData) => {
  return await api.post("/register", userData);
};

// Login user
export const loginUser = async (userData) => {
  return await api.post("/login", userData);
};

// Set authentication token for subsequent requests
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

// Retrieve token from AsyncStorage
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

// Logout utility to clear token
export const logout = async () => {
  try {
    delete api.defaults.headers.common["Authorization"];
    await AsyncStorage.removeItem("token");
  } catch (error) {
    console.error("Error during logout:", error);
  }
};

export default api;
