import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../Screens/Home";
import { COLORS } from "../constants/Theme";
import TabIcon from "../components/TabIcon";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../redux/modalSlice";
import Portfolio from "../Screens/Portfolio";
import Trade from "../Screens/Trade";
import Market from "../Screens/Market";
import Profile from "../Screens/Profile";

const Tab = createBottomTabNavigator();

const Navigation = () => {
  const tradeModalVisible = useSelector((state) => state.tradeModal);
  const dispatch = useDispatch();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 140,
            backgroundColor: COLORS.primary,
            borderTopColor: "transparent",
          },
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color, size, focused }) => {
              if (!tradeModalVisible)
                return (
                  <TabIcon
                    label="Home"
                    color={color}
                    size={size}
                    focused={focused}
                    icon="home"
                  />
                );
            },
          }}
          listeners={{
            tabPress: (event) => {
              if (tradeModalVisible) {
                event.preventDefault();
              }
            },
          }}
        />
        <Tab.Screen
          name="Portfolio"
          component={Portfolio}
          options={{
            tabBarIcon: ({ color, size, focused }) => {
              if (!tradeModalVisible)
                return (
                  <TabIcon
                    label="Portfolio"
                    color={color}
                    size={size}
                    focused={focused}
                    icon="briefcase"
                  />
                );
            },
          }}
          listeners={{
            tabPress: (event) => {
              if (tradeModalVisible) {
                event.preventDefault();
              }
            },
          }}
        />
        <Tab.Screen
          name="Trade"
          component={Trade}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <TabIcon
                label={tradeModalVisible ? "Close" : "Trade"}
                color={color}
                size={size}
                focused={focused}
                icon={tradeModalVisible ? "times" : "dollar-sign"}
                onPress={() => {
                  dispatch(showModal(!tradeModalVisible));
                }}
              />
            ),
          }}
          listeners={{
            tabPress: (event) => {
              if (tradeModalVisible) {
                event.preventDefault();
              }
            },
          }}
        />
        <Tab.Screen
          name="Market"
          component={Market}
          options={{
            tabBarIcon: ({ color, size, focused }) => {
              if (!tradeModalVisible)
                return (
                  <TabIcon
                    label="Market"
                    color={color}
                    size={size}
                    focused={focused}
                    icon="pulse"
                  />
                );
            },
          }}
          listeners={{
            tabPress: (event) => {
              if (tradeModalVisible) {
                event.preventDefault();
              }
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color, size, focused }) => {
              if (!tradeModalVisible)
                return (
                  <TabIcon
                    label="Profile"
                    color={color}
                    size={size}
                    focused={focused}
                    icon="person"
                  />
                );
            },
          }}
          listeners={{
            tabPress: (event) => {
              if (tradeModalVisible) {
                event.preventDefault();
              }
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
