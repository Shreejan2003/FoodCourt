import { StyleSheet, Text, TouchableOpacity } from "react-native";

const MyButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#6D0000",
    paddingHorizontal: 40,
    paddingVertical: 13,
    borderRadius: 10,
    width: 140,
    justifyContent: "center", // Aligns content vertically
    alignItems: "center",
  },
  text: { fontSize: 16, color: "white", fontWeight: 500 },
});
export default MyButton;
