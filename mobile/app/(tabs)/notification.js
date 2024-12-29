import { View, Text, ScrollView } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import NotifyBox from "../../components/NotifyBox";
const notification = () => {
  return (
    <ScrollView style={styles.ScrollContainer}>
      <View style={styles.mainContainer}>
        <NotifyBox inbox={"This is a notification"} />
      </View>
    </ScrollView>
  );
};

export default notification;

const styles = StyleSheet.create({
  ScrollContainer: { flex: 1, padding: 10, borderWidth: 0, gap: 15 },
  mainContainer: { flex: 1, padding: 10, borderWidth: 0, gap: 15 },
});
