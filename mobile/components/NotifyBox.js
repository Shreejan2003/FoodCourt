import { View, Text } from "react-native";
import React from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";
import FoodQtyButton from "./buttons/FoodQtyButton";
import ContainerButton from "./buttons/ContainerButton";

const NotifyBox = ({ inbox }) => {
  return (
    <View style={styles.notificationContainer}>
      <Text>{inbox}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    height: 75,
    padding: 15,
    flexDirection: "row",
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Elevation for Android
    elevation: 5,
  },
});

export default NotifyBox;
