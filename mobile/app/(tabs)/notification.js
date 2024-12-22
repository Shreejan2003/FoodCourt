import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";

const App = () => {
  const [visibleView, setVisibleView] = useState(null); // State to track the visible view

  const handlePress = (view) => {
    setVisibleView(view); // Set the active view
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {/* Lunch Button */}
        <TouchableOpacity
          style={[
            styles.button,
            visibleView === "lunch" && styles.activeButton, // Highlight if active
          ]}
          onPress={() => handlePress("lunch")}
        >
          <Text
            style={[
              styles.buttonText,
              visibleView === "lunch" && styles.activeButtonText,
            ]}
          >
            Lunch
          </Text>
        </TouchableOpacity>

        {/* Dinner Button */}
        <TouchableOpacity
          style={[
            styles.button,
            visibleView === "dinner" && styles.activeButton,
          ]}
          onPress={() => handlePress("dinner")}
        >
          <Text
            style={[
              styles.buttonText,
              visibleView === "dinner" && styles.activeButtonText,
            ]}
          >
            Dinner
          </Text>
        </TouchableOpacity>

        {/* Breakfast Button */}
        <TouchableOpacity
          style={[
            styles.button,
            visibleView === "breakfast" && styles.activeButton,
          ]}
          onPress={() => handlePress("breakfast")}
        >
          <Text
            style={[
              styles.buttonText,
              visibleView === "breakfast" && styles.activeButtonText,
            ]}
          >
            Breakfast
          </Text>
        </TouchableOpacity>
      </View>

      {/* Conditional Views */}
      {visibleView === "lunch" && (
        <View style={styles.lunch}>
          <Text style={styles.text}>This is the Lunch View</Text>
        </View>
      )}
      {visibleView === "dinner" && (
        <View style={styles.dinner}>
          <Text style={styles.text}>This is the Dinner View</Text>
        </View>
      )}
      {visibleView === "breakfast" && (
        <View style={styles.breakfast}>
          <Text style={styles.text}>This is the Breakfast View</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "lightgray",
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: "blue", // Highlight active button
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
  },
  activeButtonText: {
    color: "white", // Change text color for active button
  },
  lunch: {
    backgroundColor: "lightgreen",
    padding: 20,
    borderRadius: 10,
  },
  dinner: {
    backgroundColor: "lightcoral",
    padding: 20,
    borderRadius: 10,
  },
  breakfast: {
    backgroundColor: "lightblue",
    padding: 20,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default App;
