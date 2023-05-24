import { View, Text, Pressable } from "react-native";
import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Settings from "../screens/Settings";
import TabIcon from "./TabIcon";
import SearchFlight from "../screens/SearchFlight";
import FlightDetailsModal from "../components/FlightDetailsModal";

const BottomTab = createBottomTabNavigator();

/* tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: 55,
          backgroundColor: "#fff",
          borderTopColor: "transparent",
        }, */

const Tabs = () => {
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        tabBarButton: ["SearchFlight", "FlightDetailsModal"].includes(
          route.name
        )
          ? () => {
              return null;
            }
          : undefined,
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: 55,
          backgroundColor: "#fff",
          borderTopColor: "transparent",
        },
      })}
    >
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return <TabIcon label="Home" focused={focused} icon="home" />;
          },
        }}
      />
      <BottomTab.Screen
        name="SearchFlight"
        component={SearchFlight}
        options={{
          tabBarIcon: ({ focused }) => {
            return <TabIcon label="Home" focused={focused} icon="home" />;
          },
        }}
      />
      <BottomTab.Screen
        name="FlightDetailsModal"
        component={FlightDetailsModal}
        options={{
          tabBarIcon: ({ focused }) => {
            return <TabIcon label="Home" focused={focused} icon="home" />;
          },
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <TabIcon
                label="Ticket"
                focused={focused}
                icon="ticket"
                isTicket={true}
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        name="Notification"
        component={Settings}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <TabIcon label="Notifs" focused={focused} icon="notifications" />
            );
          },
        }}
      />
      <BottomTab.Screen
        name="User"
        component={Settings}
        options={{
          tabBarIcon: ({ focused }) => {
            return <TabIcon label="User" focused={focused} icon="person" />;
          },
        }}
      />
    </BottomTab.Navigator>
  );
};

export default Tabs;
