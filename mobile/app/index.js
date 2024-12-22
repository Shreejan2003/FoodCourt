import { View, Text } from "react-native";
import React from "react";
import MyButton from "../components/MyButton";
import Logo from "../components/logo";
import _link from "../components/_link";
import { useRouter } from "expo-router";
import { Link } from "expo-router";

const index = () => {
  const router = useRouter();
  const onContinue = () => {
    router.navigate("/login");
  };
  const onSignup = () => {
    router.navigate("/signup");
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#fefffe" }}>
      <View
        style={{
          flex: 2,
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 0,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Let's get started
        </Text>
        <Logo />
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <MyButton title={"Login"} onPress={onContinue} />
        <Text style={{ marginTop: 12, fontSize: 14 }}>
          Already Have an account?{" "}
          {
            <_link
              title={"Sign in"}
              onPress={onSignup}
            /> /* fix the onPress function to route to differnt place */
          }
        </Text>
      </View>
    </View>
  );
};

export default index;
