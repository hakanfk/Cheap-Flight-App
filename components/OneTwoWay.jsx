import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";

const OneTwoWay = () => {
  const [oneTwoWay, setOneTwoWay] = useState(1);

  return (
    <View
      className={`bg-[#e6e6e9]/80 mt-2  mx-auto h-14 rounded-full flex flex-row justify-center items-centers px-8`}
    >
      <View className="flex flex-row gap-x-4  justify-center items-center">
        <Pressable
          className={`h-[44px] px-[36px] ${
            oneTwoWay == 1 ? "bg-white" : null
          } flex justify-center items-center rounded-full`}
          onPress={() => setOneTwoWay(1)}
        >
          <Text
            className={`tracking-wide font-[500] text-base ${
              oneTwoWay == 1 ? "" : "text-gray-500"
            }`}
          >
            One-Way
          </Text>
        </Pressable>
        <Pressable
          className={`h-[44px] px-8 ${
            oneTwoWay == 2 ? "bg-white" : null
          } flex justify-center items-center rounded-full`}
          onPress={() => setOneTwoWay(2)}
        >
          <Text
            className={`tracking-wide font-[500] text-base ${
              oneTwoWay == 2 ? "" : "text-gray-500"
            }`}
          >
            Round-Trip
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default OneTwoWay;
