import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

const _link = ({ title, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.6} style={styles.link} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "blue",
    fontSize: 14,
  },
});

export default _link;
