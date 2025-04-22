import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function FoodCard({ name, calories }) {
  return (
<View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.calories}>{calories} kcal</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 15, margin: 10, backgroundColor: "#f9f9f9", borderRadius: 10 },
  name: { fontSize: 18, fontWeight: "bold" },
  calories: { fontSize: 16, color: "gray" },
});
