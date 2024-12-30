import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import NotifyBox from "../../components/NotifyBox";

const Notification = () => {
  const [notifications, setNotifications] = useState([]); // Store notifications
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) throw new Error("Unauthorized: Token is missing");

        const response = await axios.get("http://192.168.1.7:5000/api/notifications", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setNotifications(response.data.notifications || []); // Set notifications
        setLoading(false);
      } catch (error) {
        console.error("Error fetching notifications:", error.message);
        Alert.alert("Error", "Failed to load notifications. Please try again.");
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#800000" />
      </View>
    );
  }

  if (notifications.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No notifications available.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.ScrollContainer}>
      <View style={styles.mainContainer}>
        {notifications.map((notification, index) => (
          <NotifyBox key={index} inbox={notification.message} date={notification.createdAt} />
        ))}
      </View>
    </ScrollView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  ScrollContainer: { flex: 1, padding: 10, backgroundColor: "#F9F9F9" },
  mainContainer: { flex: 1, padding: 10, gap: 15 },
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 16, color: "#555", fontWeight: "bold" },
});
