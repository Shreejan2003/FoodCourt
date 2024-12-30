import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect
import { getNotifications } from "../api"; // Import API function
import NotifyBox from "../../components/NotifyBox"; // A UI container for notifications

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNotifications = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getNotifications(); // Call API
      console.log("Notifications fetched:", data); // Debugging log
      setNotifications(data);
    } catch (err) {
      console.error("Error fetching notifications:", err);
      setError("Failed to load notifications. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchNotifications(); // Fetch notifications every time the screen is focused
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#800000" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (notifications.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No notifications found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.mainContainer}>
        {notifications.map((notification) => (
          <NotifyBox
            key={notification._id}
            message={notification.message}
            date={new Date(notification.createdAt).toLocaleString()}
            read={notification.read}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  scrollContainer: { flex: 1, padding: 10 },
  mainContainer: { flex: 1, gap: 10 },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: { color: "red", fontSize: 16 },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#555",
    fontSize: 16,
  },
});
