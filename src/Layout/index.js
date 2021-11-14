import React, { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import CustomButton from "../components/CustomButton";
import { COLORS, SIZES } from "../constants/Theme";

export default function Layout(props) {
  const tradeModalVisible = useSelector((state) => state.tradeModal);
  // const dispatch = useDispatch();

  const modalAnimatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (tradeModalVisible) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [tradeModalVisible]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - 280],
  });

  return (
    <>
      {props.children}
      {tradeModalVisible && (
        <Animated.View style={styles.backdrop} opacity={modalAnimatedValue} />
      )}
      <Animated.View style={[styles.bottomModalContainer, { top: modalY }]}>
        <CustomButton>Transfer</CustomButton>
        <CustomButton containerStyle={styles.m10}>Withdraw</CustomButton>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  bottomModalContainer: {
    position: "absolute",
    width: "100%",
    padding: SIZES.padding,
    backgroundColor: COLORS.primary,
    alignItems: "center",
  },
  m10: { marginTop: 10 },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.transparentBlack,
  },
});
