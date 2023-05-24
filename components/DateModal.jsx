import { View, Text } from "react-native";
import React, { useState } from "react";
import { Calendar } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";

const DateModal = ({ isRoundTrip, setcalendarVisible, getDate }) => {
  const today = new Date();

  return (
    <View className="">
      <View className="w-full h-14 bg-[#1e71bb]/80 flex flex-row items-center px-2">
        <Ionicons
          name="arrow-back-sharp"
          size={36}
          color="white"
          onPress={() => setcalendarVisible(false)}
        />
        <Text className="font-normal text-lg tracking-wide ml-4 text-white">
          Select Your Departure Date
        </Text>
      </View>
      <Calendar
        enableSwipeMonths={true}
        onDayPress={(date) => {
          getDate(date.dateString);
          setcalendarVisible(false);
        }}
        minDate={today}
      />
    </View>
  );
};

export default DateModal;
