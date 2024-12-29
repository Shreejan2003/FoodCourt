import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRoute, useNavigation } from "@react-navigation/native";

const Plate = () => {
  const route = useRoute();
  const navigation = useNavigation(); // For navigation back to Menu after placing an order
  const { plateItems = [] } = route.params || {};
  const [orderItems, setOrderItems] = useState(
    plateItems.map((item) => ({ ...item, quantity: 1 }))
  );
  const [loading, setLoading] = useState(false);
  const [userPoints, setUserPoints] = useState(0);

  // Fetch user points when the component mounts
  useEffect(() => {
    const fetchUserPoints = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) throw new Error("Unauthorized: Token is missing");

        const response = await axios.get("http://192.168.1.7:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserPoints(response.data.points); // Set user's available points
        console.log("User points fetched:", response.data.points);
      } catch (error) {
        console.error("Error fetching user points:", error.message);
        Alert.alert("Error", "Failed to fetch user points.");
      }
    };

    fetchUserPoints();
  }, []);

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

      // Check if user has sufficient points
      if (totalPoints > userPoints) {
        Alert.alert(
          "Insufficient Points",
          `You need ${totalPoints - userPoints} more points to place this order.`
        );
        return;
      }

      setLoading(true);

      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error("Unauthorized: Token is missing");

      // Construct payload
      const payload = {
        items: orderItems.map((item) => ({
          menuItemId: item._id,
          quantity: item.quantity,
        })),
      };

      console.log("Placing order with payload:", payload);

      // API call to place the order
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

      console.log("Order Response:", response.data);
      Alert.alert("Order Placed", "Your order has been placed successfully!");

      // Navigate back to Menu and reset state
      setOrderItems([]); // Reset order items
      navigation.navigate("menu");
    } catch (error) {
      console.error("Error placing order:", error.response?.data || error.message);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to place the order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!orderItems || orderItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Your plate is empty!</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back to Menu</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      {loading && <ActivityIndicator size="large" color="#800000" />}
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
        <Text style={styles.totalText}>Available Points: {userPoints} pts</Text>
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
