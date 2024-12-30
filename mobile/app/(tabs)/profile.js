import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { getUserInfo } from "../api"; // Ensure correct API function import

const Profile = () => {
  const [userData, setUserData] = useState({
    username: "Loading...",
    points: "0",
  });

  const navigation = useNavigation(); // For navigating back to login after logout

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        console.log("Fetching user info...");

        // Call the API
        const response = await getUserInfo();
        console.log("User Info Response:", response); // Log API response

        // Extract username and points from response
        const { username, points } = response; // Adjust based on your API's response structure
        setUserData({ username, points });
      } catch (error) {
        console.error("Error fetching user info:", error.response?.data || error.message);
        Alert.alert("Error", "Failed to load user information.");
      }
    };

    fetchUserInfo();
  }, []);

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token"); // Remove token
      console.log("Logged out successfully.");
      Alert.alert("Logout Successful", "You have been logged out.");
      navigation.navigate("login"); // Navigate to login screen
    } catch (error) {
      console.error("Logout Error:", error.message);
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.profileIcon}>
          <Text style={styles.profileIconText}>👤</Text>
        </View>
        <Text style={styles.nameText}>{userData.username}</Text>
        <Text style={styles.pointsText}>Points: {userData.points}</Text>
      </View>

      {/* Reward Points Section */}
      <View style={styles.rewardSection}>
        <Text style={styles.rewardText}>Reward points:</Text>
        <Text style={styles.rewardValue}>{userData.points}</Text>
      </View>

      {/* Statement Section */}
      <View style={styles.statementSection}>
        <Text style={styles.statementText}>Statement</Text>
      </View>

      {/* Logout Button */}
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
  statementSection: {
    backgroundColor: "#F0F0F0",
    width: "90%",
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statementText: {
    fontSize: 16,
    color: "#333",
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
