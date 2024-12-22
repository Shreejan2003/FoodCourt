import { View, Text, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import MyButton from "../components/MyButton";
import Logo from "../components/logo";
import _link from "../components/_link";
import { useRouter } from "expo-router";
import { registerUser } from "./api"; // Import API function

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

    const userData = { username: fullName, email, password, role: "user" };

    try {
      const response = await registerUser(userData);
      Alert.alert("Success", response.data.message);
      router.push("/login"); // Navigate to login after successful signup
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error.message);
      Alert.alert("Error", error.response?.data?.message || "Registration failed!");
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
          borderWidth: 0,
          flex: 2,
          justifyContent: "center",
          alignItems: "center",
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          backgroundColor: "white",
        }}
      >
        <View style = {{borderWidth: 0, //---------------------------------------------------------bookmark
        flex: 1, }}>
          <Text style={{ marginTop: 12, fontSize: 15, fontWeight: "bold" }}>
            Full Name
          </Text>
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
          <Text style={{ marginTop: 12, fontSize: 15, fontWeight: "bold" }}>
            Email Address
          </Text>
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
          <Text style={{ marginTop: 12, fontSize: 15, fontWeight: "bold" }}>
            Enter Password
          </Text>
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
          <Text style={{ marginTop: 12, fontSize: 15, fontWeight: "bold" }}>
            Re-Enter Password
          </Text>
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
          <View style={{ alignItems: "center", borderWidth: 0 }}>
            <MyButton title={"Sign Up"} onPress={handleSignUp} />
            <Text
              style={{
                marginTop: 20,
                marginBottom: 20,
                fontWeight: "500",
                fontSize: 15,
              }}
            >
              Already Have an account?{" "}
              {<_link title={"Login"} onPress={() => router.push("/login")} />}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignUp;
