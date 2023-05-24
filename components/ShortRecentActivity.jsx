import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import ActivityCard from "./ActivityCard";

const ShortRecentActivity = () => {
  return (
    <View className="w-[95%] mx-auto mt-8">
      <View className="flex flex-row justify-between">
        <Text className="font-bold tracking-wide">Recent Activity</Text>
        <Pressable className="font-bold tracking-wide px-3 py-1 bg-gray-300 rounded-full">
          <Text className="font-bold">View All</Text>
        </Pressable>
      </View>

      <View className="flex mx-3 mt-0 ">
        <ActivityCard />
        {/* <ActivityCard /> */}
      </View>
    </View>
  );
};

export default ShortRecentActivity;
