import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import FoodQtyButton from "./buttons/FoodQtyButton";
import ContainerButton from "./buttons/ContainerButton";

const Food_Container = ({ title, pts, onAddToPlate }) => {
  const [counterValue, setCounterValue] = useState(0);

  const handleCounterChange = (newCounterValue) => {
    setCounterValue(newCounterValue); // Update counter value
  };

  const handleAddToPlate = () => {
    if (counterValue > 0) {
      onAddToPlate({ title, pts, quantity: counterValue }); // Pass item details to parent
    } else {
      console.log("Quantity must be greater than 0 to add to plate.");
    }
  };

  const containerStyle =
    counterValue > 0 ? styles.mainContainerActive : styles.mainContainer;

  const imgcontainerStyle =
    counterValue > 0 ? styles.imgContainerActive : styles.imgContainer;

  return (
    <View style={containerStyle}>
      <View style={imgcontainerStyle}>
        <Image
          source={require("../assets/images/coffee.png")} // Use require for local images
          style={{ width: 80, height: 80 }}
        />
      </View>
      <View style={styles.funcContainer}>
        <View style={styles.funcConainter_left}>
          <View style={styles.funcContainer_left_up}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>{title}</Text>
            <Text>{pts} pts</Text>
          </View>
          <View style={styles.funcContainer_left_down}>
            <FoodQtyButton onCouterChange={handleCounterChange} />
          </View>
        </View>
        <View style={styles.funcConainter_right}>
          <ContainerButton title={counterValue * pts} />
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddToPlate}
          >
            <Text style={styles.addButtonText}>Add to Plate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: 100,
    flexDirection: "row",
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mainContainerActive: {
    height: 100,
    flexDirection: "row",
    borderRadius: 20,
    backgroundColor: "#FFD1D1",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imgContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#E0E0E0",
  },
  imgContainerActive: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    borderRadius: 20,
    backgroundColor: "#ffffff",
  },
  funcContainer: {
    flex: 2.5,
    padding: 5,
    flexDirection: "row",
  },
  funcConainter_left: { flex: 1, padding: 4 },
  funcConainter_right: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  funcContainer_left_up: { flex: 1 },
  funcContainer_left_down: {
    flex: 1,
    justifyContent: "flex-end",
  },
  addButton: {
    backgroundColor: "#6D0000",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default Food_Container;
