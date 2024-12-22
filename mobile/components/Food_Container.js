import { View, Text } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import FoodCounterButton from "./FoodCounterButton";

const Food_Container = ({ title, pts }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.imgContainer}></View>
      <View style={styles.funcContainer}>
        <View style={styles.funcConainter_left}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>{title}</Text>
          <Text>{pts} pts</Text>
        </View>
        <View style={styles.funcConainter_right}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: 100,
    flexDirection: "row",
    // borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "#FFD1D1",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Elevation for Android
    elevation: 5,
  },
  imgContainer: {
    // borderWidth: 1,
    flex: 1,
    borderRadius: 20,
    backgroundColor: "white",
  },
  funcContainer: {
    // borderWidth: 1,
    flex: 2.5,
    padding: 5,
    flexDirection: "row",
  },
  funcConainter_left: { borderWidth: 1, flex: 1, padding: 10 },
  funcConainter_right: { borderWidth: 1, flex: 1, padding: 10 },
});

export default Food_Container;
