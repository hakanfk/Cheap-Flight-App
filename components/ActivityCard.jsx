import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const ActivityCard = () => {
  const navigation = useNavigation();

  const [lastSearch, setlastSearch] = useState({
    /* departure: "",
    arrival: "",
    date: "", */
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("lastSearches");
        const lol = JSON.parse(jsonValue);
        console.log(lol);
        console.log(typeof lol);
        setlastSearch(lol);
      } catch (e) {
        // error reading value
        console.log(e);
      }
    };
    getData();
  }, []);

  if (!lastSearch) {
    return (
      <View className="flex justify-center items-center">
        <Text>No recent Search</Text>
      </View>
    );
  }

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("SearchFlight", {
          departure: lastSearch.departure,
          arrival: lastSearch.arrival,
          date: lastSearch.date,
        })
      }
      className=" h-[68px] mt-2 w-full flex flex-row justify-around rounded-xl border-b-[0.1px] "
    >
      <View className="h-full flex justify-center items-center">
        {/*         <Text className="text-xs font-light">Trabzon</Text>
         */}
        <Text className="text-lg font-normal"> {lastSearch.departure} </Text>
        {/*         <Text className="text-xs font-light">10.50</Text>
         */}
      </View>
      <View className="h-full flex justify-center items-center">
        <Text className="font-normal"> {lastSearch.date} </Text>
        <View className="flex flex-row justify-center items-center">
          <View className="w-16 h-[2px] bg-gray-200 mr-2"></View>
          <Ionicons name="airplane" size={24} color="#1e91bb" />
          <View className="w-16 h-[2px] bg-gray-200 ml-2"></View>
        </View>
      </View>
      <View className="h-full flex justify-center items-center">
        {/*         <Text className="text-xs font-light">Amsterdam</Text>
         */}
        <Text className="text-lg font-normal"> {lastSearch.arrival} </Text>
        {/*         <Text className="text-xs font-light">14.50</Text>
         */}
      </View>
    </Pressable>
  );
};

export default ActivityCard;
