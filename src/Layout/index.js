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
    <View>
      {props.children}
      <Animated.View style={[styles.bottomModalContainer, { top: modalY }]}>
        <CustomButton>Transfer</CustomButton>
        <CustomButton containerStyle={styles.m10}>Withdraw</CustomButton>
      </Animated.View>
    </View>
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
});
