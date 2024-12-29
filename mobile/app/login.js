import { View, Text, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import MyButton from "../components/MyButton";
import Logo from "../components/logo";
import _link from "../components/_link";
import { useRouter } from "expo-router";
import { loginUser, setAuthToken } from "./api";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email and password are required!");
      return;
    }
  
    try {
      const response = await loginUser({ email, password });
      const token = response.token || response.data?.token; // Check both places
  
      if (!token) {
        throw new Error("Token not found in response.");
      }
  
      await setAuthToken(token); // Save token and set it in headers
      Alert.alert("Success", "Login successful!");
      router.push("/(tabs)"); // Navigate to the main app
    } catch (error) {
      console.error("Login Error:", error.message || error.response?.data);
      const errorMessage = error.response?.data?.message || "Login failed!";
      Alert.alert("Error", errorMessage);
    }
  };
  
  return (
    <View style={{ flex: 1, backgroundColor: "#E0E0E0E0" }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 0,
          backgroundColor: "#E0E0E0E0",
        }}
      >
        <Logo />
      </View>
      <View
        style={{
          flex: 1.7,
          justifyContent: "center",
          borderWidth: 0,
          alignItems: "center",
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          backgroundColor: "white",
        }}
      >
        {/* ------------------------------------------------------------------------------------------------------------- bookmark */}
        <View style = {{borderWidth: 0, flex: 1, justifyContent: "center", alignItems: "center"}}>
        <View style = {{borderWidth: 0}}>
          <Text style={{ marginTop: 12, fontSize: 15, fontWeight: "bold" }}>
            Email Address
          </Text>
          <TextInput
            placeholder="Enter Your Email"
            style={{
              backgroundColor: "#E0E0E0E0",
              height: 50,
              width: 300,
              borderRadius: 20,
              padding: 15,
              marginTop: 5,
            }}
            value={email}
            onChangeText={setEmail}
          />
          <Text style={{ marginTop: 20, fontSize: 15, fontWeight: "bold" }}>
            Password
          </Text>
          <TextInput
            placeholder="Password"
            style={{
              backgroundColor: "#E0E0E0E0",
              height: 50,
              width: 300,
              borderRadius: 20,
              padding: 15,
              marginTop: 5,
              marginBottom: 50,
            }}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          </View>
          <View style = {{borderWidth: 0,alignItems: "center"}}>
        <MyButton title={"Login"} onPress={handleLogin} />
        <Text
          style={{
            marginTop: 20,
            marginBottom: 20,
            fontWeight: "500",
            fontSize: 15,
          }}
        >
          Don't have an account?{" "}
          {<_link title={"Sign up"} onPress={() => router.push("/signup")} />}
        </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Login;
