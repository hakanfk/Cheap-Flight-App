import { View, Text, Pressable } from "react-native";
import React from "react";

const Button = ({ label, onPressProp, bg }) => {
  return (
    <Pressable
      onPress={onPressProp}
      android_ripple={{ color: "rgb(39 39 42)", radius: 145 }}
      className={` w-3/4 h-12 rounded-full mt-8  flex justify-center
      items-center overflow-hidden ${bg} `}
    >
      <Text className="text-[#101010] font-[500] text-[17px] tracking-wider">
        {label}
      </Text>
    </Pressable>
  );
};

export default Button;
