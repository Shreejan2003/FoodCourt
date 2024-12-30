import React from "react";
import { View, Text, StyleSheet } from "react-native";

const NotifyBox = ({ inbox, date }) => {
  const formatDate = (isoDate) => {
    const options = { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" };
    return new Date(isoDate).toLocaleDateString(undefined, options);
  };

  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Text style={styles.iconText}>🔔</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.message}>{inbox}</Text>
        <Text style={styles.date}>{formatDate(date)}</Text>
      </View>
    </View>
  );
};

export default NotifyBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    marginBottom: 10,
  },
  icon: {
    backgroundColor: "#800000",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  iconText: {
    color: "#FFF",
    fontSize: 24,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    color: "#888",
  },
});
