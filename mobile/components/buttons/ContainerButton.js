import { StyleSheet, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";

const ContainerButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#6D0000",
    // paddingHorizontal: 40,
    // paddingVertical: 13,
    borderRadius: 10,
    width: 75,
    height: 23,
    justifyContent: "center", // Aligns content vertically
    alignItems: "center",
  },
  text: { fontSize: 13, color: "white" },
});

export default ContainerButton;
