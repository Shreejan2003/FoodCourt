import React from "react";
import { View, Text, StyleSheet } from "react-native";

const NotifyBox = ({ message, date, read }) => {
  return (
    <View style={[styles.container, read ? styles.read : styles.unread]}>
      <Text style={styles.message}>{message}</Text>
      <Text style={styles.date}>{date}</Text>
    </View>
  );
};

export default NotifyBox;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  message: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  date: {
    fontSize: 12,
    color: "#777",
    marginTop: 5,
  },
  read: {
    borderLeftWidth: 5,
    borderLeftColor: "#6D0000",
  },
  unread: {
    borderLeftWidth: 5,
    borderLeftColor: "#FFD700",
  },
});
