import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Food_Container from "../../components/Food_Container";
import { getMenuItems } from "../api";
import { useNavigation } from "@react-navigation/native";

const Menu = () => {
  const [visibleView, setVisibleView] = useState("breakfast");
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [plateItems, setPlateItems] = useState([]); // To store selected items

  const navigation = useNavigation();

  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true);
      setError(null);

      try {
        const items = await getMenuItems(visibleView);
        setMenuItems(items);
      } catch (err) {
        console.error("Error fetching menu items:", err.message);
        setError("Failed to fetch menu items. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [visibleView]);

  const handleAddToPlate = (item) => {
    // Check if item is already in plate
    const exists = plateItems.find((plateItem) => plateItem._id === item._id);
    if (exists) {
      Alert.alert("Already Added", `${item.name} is already in your plate.`);
    } else {
      setPlateItems((prev) => [...prev, item]);
      Alert.alert("Added to Plate", `${item.name} has been added to your plate.`);
      console.log("Plate Items:", plateItems); // Debugging log
    }
  };

  const goToPlate = () => {
    if (plateItems.length === 0) {
      Alert.alert("No Items Selected", "Please add items to your plate.");
      return;
    }

    console.log("Navigating to Plate with items:", plateItems); // Debugging log
    navigation.navigate("plate", { plateItems }); // Pass plateItems via navigation
  };

  return (
    <View style={styles.container}>
      {/* Top Navigation */}
      <View style={styles.topContainer}>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={[
              styles.button,
              visibleView === "breakfast" && styles.activeButton,
            ]}
            onPress={() => setVisibleView("breakfast")}
          >
            <SimpleLineIcons
              name="cup"
              size={48}
              color={visibleView === "breakfast" ? "white" : "black"}
            />
          </TouchableOpacity>
          <Text style={{ color: "black" }}>Breakfast</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={[
              styles.button,
              visibleView === "lunch" && styles.activeButton,
            ]}
            onPress={() => setVisibleView("lunch")}
          >
            <FontAwesome6
              name="bowl-rice"
              size={48}
              color={visibleView === "lunch" ? "white" : "black"}
            />
          </TouchableOpacity>
          <Text style={{ color: "black" }}>Lunch</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={[
              styles.button,
              visibleView === "snacks" && styles.activeButton,
            ]}
            onPress={() => setVisibleView("snacks")}
          >
            <MaterialCommunityIcons
              name="hamburger"
              size={48}
              color={visibleView === "snacks" ? "white" : "black"}
            />
          </TouchableOpacity>
          <Text style={{ color: "black" }}>Snacks</Text>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.bottomContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#6D0000" />
        ) : error ? (
          <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
        ) : (
          <ScrollView>
            <View style={styles[visibleView]}>
              {menuItems.map((item) => (
                <Food_Container
                  key={item._id}
                  title={item.name}
                  pts={item.price}
                  onAddToPlate={() => handleAddToPlate(item)}
                />
              ))}
            </View>
          </ScrollView>
        )}
      </View>

      {/* Plate Button */}
      {plateItems.length > 0 && (
        <TouchableOpacity style={styles.plateButton} onPress={goToPlate}>
          <Text style={styles.plateButtonText}>
            View Plate ({plateItems.length})
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, borderWidth: 0 },
  topContainer: {
    flexDirection: "row",
    gap: 20,
    flex: 1,
    padding: 15,
    justifyContent: "center",
  },
  bottomContainer: {
    borderWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  activeButton: {
    backgroundColor: "#6D0000",
    padding: 14,
    borderRadius: 10,
    width: 100,
    height: 110,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  lunch: { flex: 1, padding: 10, gap: 20 },
  snacks: { flex: 1, padding: 10, gap: 20 },
  breakfast: { flex: 1, padding: 10, gap: 20 },
  plateButton: {
    backgroundColor: "#6D0000",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    margin: 20,
  },
  plateButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default Menu;
