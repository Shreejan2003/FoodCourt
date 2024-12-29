import { View, Text, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import MyButton from "../components/MyButton";
import Logo from "../components/logo";
import { useRouter } from "expo-router";
import { registerUser } from "./api"; // Import API function

const _link = ({ title, onPress }) => (
  <Text style={{ color: "blue", textDecorationLine: "underline" }} onPress={onPress}>
    {title}
  </Text>
);

const SignUp = () => {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert("Error", "All fields are required!");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
    const isValidPassword = (password) => password.length >= 6;

    if (!isValidEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address!");
      return;
    }
    if (!isValidPassword(password)) {
      Alert.alert("Error", "Password must be at least 6 characters long!");
      return;
    }

    const userData = { username: fullName, email, password, role: "user" };

    try {
      console.log("Signing up user with data:", userData); // Debug log
      const response = await registerUser(userData);
      Alert.alert("Success", "Registration successful! Please log in.");
      router.push("/login"); // Navigate to login after successful signup
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error.message);
      const errorMessage = error.response?.data?.message || "Registration failed!";
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
          backgroundColor: "#E0E0E0E0",
        }}
      >
        <Logo />
      </View>
      <View
        style={{
          flex: 2,
          justifyContent: "center",
          alignItems: "center",
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          backgroundColor: "white",
        }}
      >
        <Text style={{ marginTop: 12, fontSize: 15, fontWeight: "bold" }}>Full Name</Text>
        <TextInput
          style={{
            backgroundColor: "#E0E0E0E0",
            height: 50,
            width: 300,
            borderRadius: 20,
            padding: 15,
            marginTop: 5,
          }}
          value={fullName}
          onChangeText={setFullName}
        />
        <Text style={{ marginTop: 12, fontSize: 15, fontWeight: "bold" }}>Email Address</Text>
        <TextInput
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
          keyboardType="email-address"
        />
        <Text style={{ marginTop: 12, fontSize: 15, fontWeight: "bold" }}>Enter Password</Text>
        <TextInput
          style={{
            backgroundColor: "#E0E0E0E0",
            height: 50,
            width: 300,
            borderRadius: 20,
            padding: 15,
            marginTop: 5,
          }}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Text style={{ marginTop: 12, fontSize: 15, fontWeight: "bold" }}>Re-Enter Password</Text>
        <TextInput
          style={{
            backgroundColor: "#E0E0E0E0",
            height: 50,
            width: 300,
            borderRadius: 20,
            padding: 15,
            marginTop: 5,
            marginBottom: 50,
          }}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <MyButton title={"Sign Up"} onPress={handleSignUp} />
        <Text style={{ marginTop: 20, fontWeight: "500", fontSize: 15 }}>
          Already Have an account?{" "}
          <_link title={"Login"} onPress={() => router.push("/login")} />
        </Text>
      </View>
    </View>
  );
};

export default SignUp;
