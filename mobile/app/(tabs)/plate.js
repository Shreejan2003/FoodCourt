import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRoute, useNavigation } from "@react-navigation/native";

const Plate = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { plateItems = [] } = route.params || {}; // Ensure plateItems is passed correctly
  const [orderItems, setOrderItems] = useState(
    plateItems.map((item) => ({ ...item, quantity: 1 }))
  );
  const [loading, setLoading] = useState(false);

  console.log("Plate Screen Items:", plateItems); // Debugging log

  const handleIncrease = (id) => {
    setOrderItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id) => {
    setOrderItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const calculateTotal = () => {
    return orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handlePlaceOrder = async () => {
    try {
      const totalPoints = calculateTotal();

      setLoading(true);

      const token = await AsyncStorage.getItem("token"); // Retrieve token
      console.log("Token being sent:", token); // Debugging token
      if (!token) {
        throw new Error("Unauthorized: Token is missing");
      }

      // Construct payload
      const payload = {
        items: orderItems.map((item) => ({
          menuItemId: item._id,
          quantity: item.quantity,
        })),
      };

      console.log("Payload:", payload); // Debugging payload

      // Make API call to place order
      const response = await axios.post(
        "http://192.168.1.7:5000/api/orders/place",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Order Response:", response.data); // Debugging success response
      Alert.alert("Order Placed", "Your order has been placed successfully!");
      navigation.goBack(); // Navigate back after placing the order
    } catch (error) {
      if (error.response) {
        console.error("Error Response:", error.response.data);
        Alert.alert(
          "Error",
          error.response.data.message || "Failed to place the order."
        );
      } else {
        console.error("Error:", error.message);
        Alert.alert(
          "Error",
          error.message || "An unknown error occurred. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  if (!plateItems || plateItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Your plate is empty!</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Back to Menu</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={orderItems}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.orderRow}>
            <Text style={styles.itemName}>{item.name}</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.qtyButton}
                onPress={() => handleDecrease(item._id)}
              >
                <Text style={styles.qtyButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>{item.quantity}</Text>
              <TouchableOpacity
                style={styles.qtyButton}
                onPress={() => handleIncrease(item._id)}
              >
                <Text style={styles.qtyButtonText}>+</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.itemPrice}>{item.price * item.quantity} pts</Text>
          </View>
        )}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: {calculateTotal()} pts</Text>
        <TouchableOpacity
          style={styles.placeOrderButton}
          onPress={handlePlaceOrder}
          disabled={loading}
        >
          <Text style={styles.placeOrderButtonText}>
            {loading ? "Placing Order..." : "Place Order"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Plate;

const styles = StyleSheet.create({
  mainContainer: { flex: 1, padding: 15, backgroundColor: "#F5F5F5" },
  orderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  itemName: { fontSize: 16, flex: 2 },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  qtyButton: {
    backgroundColor: "#800000",
    padding: 8,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  qtyButtonText: { color: "white", fontWeight: "bold", fontSize: 16 },
  quantity: { fontSize: 16, fontWeight: "bold" },
  itemPrice: { fontSize: 16, flex: 1, textAlign: "right" },
  totalContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  totalText: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  placeOrderButton: {
    backgroundColor: "#800000",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  placeOrderButtonText: { color: "white", fontWeight: "bold", fontSize: 16 },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6D0000",
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: "#6D0000",
    padding: 10,
    borderRadius: 5,
  },
  backButtonText: { color: "white", fontSize: 16 },
});
