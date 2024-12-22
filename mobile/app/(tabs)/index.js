import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Food_Container from "../../components/Food_Container";

const menu = () => {
  const [visibleView, setVisibleView] = useState("breakfast"); // State to track the visible view

  const handlePress = (view) => {
    setVisibleView(view); // Set the active view
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.6}
            style={[
              styles.button,
              visibleView === "breakfast" && styles.activeButton, // Highlight if active
            ]}
            onPress={() => handlePress("breakfast")}
          >
            {visibleView === "breakfast" ? (
              <SimpleLineIcons name="cup" size={48} color="white" />
            ) : (
              <SimpleLineIcons name="cup" size={48} color="black" />
            )}
          </TouchableOpacity>

          <Text style={{ color: "black" }}>Breakfast</Text>
        </View>

        <View
          style={{
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.6}
            style={[
              styles.button,
              visibleView === "lunch" && styles.activeButton, // Highlight if active
            ]}
            onPress={() => handlePress("lunch")}
          >
            {visibleView === "lunch" ? (
              <FontAwesome6 name="bowl-rice" size={48} color="white" />
            ) : (
              <FontAwesome6 name="bowl-rice" size={48} color="black" />
            )}
          </TouchableOpacity>
          <Text style={{ color: "black" }}>Lunch</Text>
        </View>

        <View
          style={{
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.6}
            style={[
              styles.button,
              visibleView === "snacks" && styles.activeButton, // Highlight if active
            ]}
            onPress={() => handlePress("snacks")}
          >
            {visibleView === "snacks" ? (
              <MaterialCommunityIcons
                name="hamburger"
                size={48}
                color="white"
              />
            ) : (
              <MaterialCommunityIcons
                name="hamburger"
                size={48}
                color="black"
              />
            )}
          </TouchableOpacity>
          <Text style={{ color: "Black" }}>Snacks</Text>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        {visibleView === "lunch" && (
          <ScrollView>
            <View style={styles.lunch}>
              <Food_Container title={"Coffee"} pts={30} />
              <Food_Container title={"Tea"} pts={20} />
              <Food_Container title={"Bread"} pts={5} />
            </View>
          </ScrollView>
        )}
        {visibleView === "snacks" && (
          <ScrollView>
            <View style={styles.snacks}>
              <Food_Container />
              <Food_Container />
              <Food_Container />
              <Food_Container />
              <Food_Container />
              <Food_Container />
            </View>
          </ScrollView>
        )}
        {visibleView === "breakfast" && (
          <ScrollView>
            <View style={styles.breakfast}>
              <Food_Container />
              <Food_Container />
              <Food_Container />
              <Food_Container />
              <Food_Container />
              <Food_Container />
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, borderColor: "black", borderWidth: 1 },
  topContainer: {
    // borderColor: "black",
    // borderWidth: 1,
    flexDirection: "row",
    gap: 20,
    flex: 1,
    padding: 15,
    justifyContent: "center",
  },
  bottomContainer: {
    // borderColor: "black",
    // borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Elevation for Android
    elevation: 3,
    flex: 4,
    padding: 20,
  },
  button: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 10,
    width: 100,
    height: 110,
    justifyContent: "center", // Aligns content vertically
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Elevation for Android
    elevation: 5,
  },
  activeButton: {
    backgroundColor: "#6D0000",
    padding: 14,
    borderRadius: 10,
    width: 100,
    height: 110,
    justifyContent: "center", // Aligns content vertically
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Elevation for Android
    elevation: 5,
  },
  lunch: { flex: 1, padding: 10, gap: 20 },
  snacks: { flex: 1, padding: 10, gap: 20 },
  breakfast: { flex: 1, padding: 10, gap: 20 },
});

export default menu;
