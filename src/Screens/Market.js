import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  FlatList,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { COLORS, FONTS, SIZES } from "../constants/Theme";
import Layout from "../Layout";
import { fetchAllCoins } from "../redux/modalSlice";
import { LineChart } from "react-native-chart-kit";

const marketTabs = [
  {
    id: 1,
    title: "Cryptoassets",
  },
  {
    id: 2,
    title: "Exchanges",
  },
];

const marketDesign = marketTabs.map((item) => {
  return {
    ...item,
    ref: React.createRef(),
  };
});

const TabIndicator = ({ scrollX, measureLayout }) => {
  const inputRange = marketTabs.map((item, index) => index * SIZES.width);
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout.map((measure) => measure.x),
  });
  return (
    <Animated.View
      style={{
        position: "absolute",
        left: 0,
        width: (SIZES.width - SIZES.padding * 2) / 2,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray,
        height: "100%",
        transform: [
          {
            translateX,
          },
        ],
      }}
    />
  );
};

const Tabs = ({ scrollX, onMarketTabPress }) => {
  const [measureLayout, setMeasureLayout] = useState([]);
  const containerRef = useRef();

  useEffect(() => {
    let ml = [];
    marketDesign.forEach((item) => {
      item?.ref?.current?.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          ml.push({ x, y, width, height });
          if (ml.length === marketTabs.length) setMeasureLayout(ml);
        }
      );
    });
  }, [containerRef.current]);

  return (
    <View
      ref={containerRef}
      style={{
        flexDirection: "row",
      }}
    >
      {measureLayout.length > 0 && (
        <TabIndicator scrollX={scrollX} measureLayout={measureLayout} />
      )}
      {marketDesign.map((item, index) => {
        return (
          <TouchableOpacity
            style={{ flex: 1, justifyContent: "center" }}
            onPress={() => onMarketTabPress(index)}
          >
            <View
              ref={item.ref}
              style={{
                paddingHorizontal: SIZES.padding,
                alignItems: "center",
                justifyContent: "center",
                height: 40,
                // ...(index === 0 && {
                //   backgroundColor: COLORS.lightGray,
                //   borderRadius: SIZES.radius,
                // }),
              }}
            >
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.h3,
                }}
              >
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const Button = ({ children, style }) => (
  <View style={[styles.categoryButton, style]}>
    <Text style={[FONTS.body5, { color: COLORS.white }]}>{children}</Text>
  </View>
);

const Market = () => {
  const dispatch = useDispatch();
  const { coins } = useSelector((state) => state);
  const scrollX = useRef(new Animated.Value(0)).current;
  const marketTabScrollViewRef = useRef();

  const onMarketTabPress = useCallback((marketTabIndex) => {
    marketTabScrollViewRef?.current?.scrollToOffset({
      offset: marketTabIndex * SIZES.width,
    });
  });

  useEffect(() => {
    dispatch(fetchAllCoins());
  }, []);

  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text
            style={[
              FONTS.h1,
              {
                color: COLORS.white,
                fontWeight: "bold",
                paddingHorizontal: SIZES.padding,
              },
            ]}
          >
            Market
          </Text>
          <View
            style={{
              marginTop: SIZES.radius,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.gray,
              marginHorizontal: SIZES.padding,
            }}
          >
            <Tabs scrollX={scrollX} onMarketTabPress={onMarketTabPress} />
          </View>
          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              paddingHorizontal: SIZES.padding,
            }}
          >
            <Button>USD</Button>
            <Button style={styles.ml5}>% (7d)</Button>
            <Button style={styles.ml5}>Top</Button>
          </View>
          <Animated.FlatList
            ref={marketTabScrollViewRef}
            data={marketTabs}
            horizontal={true}
            contentContainerStyle={{ marginTop: SIZES.padding }}
            pagingEnabled
            scrollEventThrottle={16}
            snapToAlignment="center"
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            renderItem={(parentItem, index) => {
              return (
                <View
                  style={{
                    flex: 1,
                    width: SIZES.width,
                    paddingHorizontal: SIZES.padding,
                  }}
                >
                  <FlatList
                    data={coins}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                      let priceColor =
                        item.price_change_percentage_7d_in_currency === 0
                          ? COLORS.lightGray3
                          : item.price_change_percentage_7d_in_currency > 0
                          ? COLORS.lightGreen
                          : COLORS.red;
                      return (
                        <View
                          style={{
                            flexDirection: "row",
                            marginVertical: 20,
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <View style={{ flexDirection: "row" }}>
                            <Image
                              source={{ uri: item.image }}
                              style={{ width: 20, height: 20 }}
                            />
                            <Text
                              style={[
                                FONTS.h3,
                                { color: COLORS.white, marginLeft: 10 },
                              ]}
                            >
                              {item.name}
                            </Text>
                          </View>
                          <View style={{ flex: 1, alignItems: "center" }}>
                            <LineChart
                              withVerticalLabels={false}
                              withHorizontalLabels={false}
                              withDots={false}
                              withHorizontalLines={false}
                              withVerticalLines={false}
                              withInnerLines={false}
                              withOuterLines={false}
                              data={{
                                datasets: [
                                  {
                                    data: item.sparkline_in_7d.price,
                                  },
                                ],
                              }}
                              width={100}
                              height={60}
                              chartConfig={{
                                color: () => priceColor,
                              }}
                              bezier
                              style={{ paddingRight: 0 }}
                            />
                          </View>
                          <View style={{ alignItems: "flex-end" }}>
                            <Text
                              style={[
                                FONTS.h4,
                                { color: COLORS.white, fontWeight: "bold" },
                              ]}
                            >
                              $ {item.current_price}
                            </Text>
                            <View>
                              <Text
                                style={[FONTS.body5, { color: priceColor }]}
                              >
                                {item.price_change_percentage_7d_in_currency.toFixed(
                                  2
                                )}
                                %
                              </Text>
                            </View>
                          </View>
                        </View>
                      );
                    }}
                  />
                </View>
              );
            }}
          />
        </View>
      </View>
    </Layout>
  );
};

export default Market;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  innerContainer: {
    marginTop: 50,
  },
  categoryButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: COLORS.gray,
    borderRadius: SIZES.radius,
  },
  ml5: {
    marginLeft: 5,
  },
});
