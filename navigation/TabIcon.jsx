import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const TabIcon = ({ label, focused, icon, isTicket }) => {
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        /* width: 65,
        height: 65,
        backgroundColor: focused ? "black" : null,
        borderRadius: 30, */
      }}
    >
      {!isTicket ? (
        <Ionicons
          name={icon}
          size={20}
          color={focused ? "#101010" : "#ddd"}
          style={{ flexDirection: "column" }}
        />
      ) : (
        <MaterialCommunityIcons
          name="ticket-confirmation"
          size={24}
          color={focused ? "#101010" : "#ddd"}
        />
      )}
      <Text
        style={{
          color: focused ? "#101010" : "#ddd",
          marginTop: 3,
          marginLeft: 2,
          fontWeight: "600",
        }}
      >
        {label}
      </Text>
    </View>
  );
};

export default TabIcon;
