import React, { useEffect } from "react";
import { Tabs } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const TabsLayout = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        router.push("/login"); // Redirect to login if not authenticated
      }
    };
    checkAuth();
  }, []);

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Menu",
          headerTitleStyle: {
            fontFamily: "Roboto",
            fontSize: 20,
            fontWeight: "900",
          },
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="notebook" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="plate"
        options={{
          title: "Plate",
          headerTitleStyle: {
            fontFamily: "Roboto",
            fontSize: 20,
            fontWeight: "900",
          },
          tabBarIcon: ({ color }) => (
            <FontAwesome6 size={28} name="plate-wheat" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title: "Notifications",
          headerTitleStyle: {
            fontFamily: "Roboto",
            fontSize: 20,
            fontWeight: "900",
          },
          tabBarIcon: ({ color }) => (
            <Ionicons name="notifications" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerTitleStyle: {
            fontFamily: "Roboto",
            fontSize: 20,
            fontWeight: "900",
          },
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
