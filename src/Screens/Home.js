import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../components/CustomButton";
import { COLORS, SIZES, FONTS } from "../constants/Theme";
import Layout from "../Layout";
import { fetchAllCoins } from "../redux/modalSlice";

const Home = () => {
  const { coins, coinsLoading } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCoins());
  }, []);

  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.headerView}>
          <View style={styles.m50}>
            <Text style={[FONTS.h3, styles.fontSchemeWhite]}>Your Wallet</Text>
            <Text style={styles.marginTop}>
              <Text style={[FONTS.body3, styles.fontSchemeGray]}>$ </Text>
              <Text style={styles.priceText}>45.500,34 </Text>
              <Text style={[FONTS.body3, styles.fontSchemeGray]}>USD</Text>
            </Text>
            <Text style={styles.marginTop}>
              <Text style={styles.changeText}>2.30 %</Text>
              &ensp;
              <Text style={styles.dayText}>7d Change</Text>
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              marginTop: 25,
              marginBottom: -12,
            }}
          >
            <CustomButton containerStyle={{ marginRight: 10 }}>
              Transfer
            </CustomButton>
            <CustomButton containerStyle={{ marginLeft: 10 }}>
              Withdraw
            </CustomButton>
          </View>
        </View>
        {/* {coinsLoading ? (
          <ActivityIndicator />
        ) : (
          coins.map((item) => {
            return <Text>{item.name}</Text>;
          })
        )} */}
      </View>
    </Layout>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  headerView: {
    backgroundColor: COLORS.gray,
    paddingHorizontal: SIZES.padding,
    // paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  m50: {
    marginTop: 55,
  },
  fontSchemeWhite: { color: COLORS.white, fontWeight: "bold" },
  fontSchemeGray: { color: COLORS.lightGray3, fontWeight: "bold" },
  priceText: { fontSize: 22, color: COLORS.white, fontWeight: "bold" },
  marginTop: { marginTop: 8 },
  changeText: {
    color: COLORS.lightGreen,
    fontSize: 13,
  },
  dayText: {
    color: COLORS.lightGray3,
    fontSize: 10,
  },
});
