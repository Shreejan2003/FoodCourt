import { Image } from "react-native";
import React from "react";

const Logo = ({ value }) => {
  return (
    <Image
    source={require("../assets/images/foodcourtlogo.png")}
      style={{ width: 300, height: 300, marginTop: 20 }}
    />
  );
};

export default Logo;
