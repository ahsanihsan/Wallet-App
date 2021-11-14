import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants/Theme";

export default function CustomButton({ children, containerStyle }) {
  return (
    <TouchableOpacity style={[styles.buttonContainer, containerStyle]}>
      <Text style={FONTS.body3}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 35,
    paddingHorizontal: 30,
  },
});
