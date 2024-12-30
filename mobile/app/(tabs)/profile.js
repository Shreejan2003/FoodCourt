import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const Profile = () => {
  const [userData, setUserData] = useState({
    username: "Loading...",
    points: "0",
  });
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        console.log("Fetching user info...");

        const token = await AsyncStorage.getItem("token");
        if (!token) throw new Error("Unauthorized: Token is missing");

        const response = await axios.get("http://192.168.1.7:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserData({
          username: response.data.username,
          points: response.data.points,
        });
      } catch (error) {
        console.error("Error fetching user info:", error.message);
        Alert.alert("Error", "Failed to load user information.");
      }
    };

    fetchUserInfo();
  }, []);

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      console.log("Logged out successfully.");
      Alert.alert("Logout Successful", "You have been logged out.");
      navigation.navigate("login");
    } catch (error) {
      console.error("Logout Error:", error.message);
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileIcon}>
          <Text style={styles.profileIconText}>👤</Text>
        </View>
        <Text style={styles.nameText}>{userData.username}</Text>
        <Text style={styles.pointsText}>Points: {userData.points}</Text>
      </View>

      <View style={styles.rewardSection}>
        <Text style={styles.rewardText}>Reward points:</Text>
        <Text style={styles.rewardValue}>{userData.points}</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    paddingTop: 50,
  },
  header: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 20,
    marginBottom: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  profileIcon: {
    backgroundColor: "#800000",
    height: 100,
    width: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  profileIconText: {
    fontSize: 24,
    color: "#fff",
  },
  nameText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  pointsText: {
    fontSize: 14,
    color: "#555",
  },
  rewardSection: {
    backgroundColor: "#FFD6D6",
    width: "90%",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  rewardText: {
    fontSize: 16,
    color: "#333",
  },
  rewardValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 5,
  },
  logoutButton: {
    backgroundColor: "#800000",
    padding: 15,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
    marginTop: 20,
  },
  logoutButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
