import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { useState } from "react";

const FoodQtyButton = ({ onCouterChange }) => {
  const [counter, setCounter] = useState(0); // Initialize counter state

  const onPlusPress = () => {
    const newCounter = counter + 1;
    setCounter(newCounter);
    onCouterChange(newCounter);
  };
  const onMinusPress = () => {
    if (counter > 0) {
      const newCounter = counter - 1;
      setCounter(newCounter);
      onCouterChange(newCounter);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity style={styles.minusButton} onPress={onMinusPress}>
        <Text style={{ color: "white" }}>-</Text>
      </TouchableOpacity>
      <View style={styles.counterDisplay}>
        <Text>{counter}</Text>
      </View>
      <TouchableOpacity style={styles.plusButton} onPress={onPlusPress}>
        <Text style={{ color: "white" }}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FoodQtyButton;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    borderWidth: 0,
    backgroundColor: "#E0E0E0",
    width: 100,
    height: 25,
    borderRadius: 25,
  },
  plusButton: {
    // borderWidth: 2,
    backgroundColor: "#6D0000",
    height: 25,
    width: 25,
    borderRadius: 500,
    alignItems: "center",
    justifyContent: "center",
  },
  minusButton: {
    // borderWidth: 2,
    backgroundColor: "#6D0000",
    height: 25,
    width: 25,
    borderRadius: 500,
    alignItems: "center",
    justifyContent: "center",
  },
  counterDisplay: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",

    // borderWidth: 2,
  },
});
