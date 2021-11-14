import { FontAwesome5, Octicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, FONTS } from "../constants/Theme";

export default function TabIcon({ icon, label, onPress, size, focused }) {
  if (label === "Trade" || label === "Close") {
    return (
      <TouchableOpacity
        style={styles.containerTrade}
        onPress={() => {
          onPress();
        }}
      >
        <FontAwesome5 name={icon} color={COLORS.white} size={size} />
        <Text style={[FONTS.body5, { color: COLORS.white }]}>{label}</Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <View style={styles.container}>
        <Octicons
          name={icon}
          color={focused ? COLORS.white : COLORS.secondary}
          size={size}
        />
        <Text
          style={[
            FONTS.body5,
            { color: focused ? COLORS.white : COLORS.secondary },
          ]}
        >
          {label}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  containerTrade: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.black,
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});
