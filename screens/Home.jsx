import { View, Text, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import OneTwoWay from "../components/OneTwoWay";
import Flight from "../components/Flight";
import ShortRecentActivity from "../components/ShortRecentActivity";

const Onboarding = () => {
  return (
    <ScrollView className="flex flex-col ">
      <View className="relative flex ">
        <Image
          source={require("../assets/pngwing.png")}
          style={{
            width: 389,
            height: 140,
            marginTop: 20,
            resizeMode: "stretch",
          }}
        />
        <View className="w-[400px] h-[180px] absolute top-0 bg-[#1e71bb]/80 "></View>
        <View className="absolute mx-4 top-14 flex flex-row">
          <Image
            source={require("../assets/profile.jpg")}
            style={{
              width: 55,
              height: 55,
              borderRadius: 55,
            }}
          />
          <View className="flex flex-col ml-3">
            <Text className="text-[#b8cad9] mt-0 text-lg">Hello Ferina</Text>
            <Text className="mt-0 text-xl text-white font-bold tracking-wider">
              Where are you going?
            </Text>
          </View>
        </View>
      </View>
      <ScrollView className="w-full h-screen bg-[#fff] rounded-[25px] -mt-6">
        <OneTwoWay />
        <Flight />
        <ShortRecentActivity />
      </ScrollView>
    </ScrollView>
  );
};

export default Onboarding;
