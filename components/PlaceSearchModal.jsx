import { View, Text, TextInput, Pressable, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import AirportSearch from "./AirportSearch";
import { getAirport, getFlight } from "../util/skyApi";
import { airportList } from "../data/airports";

const PlaceSearch = ({ setPlaceVisible, getRouteInfo }) => {
  const [departure, setdeparture] = useState();
  const [arrival, setArrival] = useState();
  const [way, setWay] = useState(1);
  const [data, setData] = useState();
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search.length < 2) {
      console.log("If worked");
      setData(airportList);
    } else {
      const newData = data.filter((item) => {
        const city = item.city?.toLowerCase();
        const country = item.country?.toLowerCase();
        const state = item.state?.toLowerCase();

        if (
          city?.includes(search.toLowerCase()) ||
          country?.includes(search.toLowerCase()) ||
          state?.includes(search.toLowerCase())
        ) {
          return item;
        }
      });

      setData(newData);
    }
    /*  if (departure) {
      console.log(departure?.code);
    } */
  }, [search, departure]);

  function renderAirportSearch(data) {
    //console.log(data);
    return (
      <Pressable
        onPress={() => {
          if (!departure) {
            setdeparture({ city: data.item.city, code: data.item.code });
            console.log("Set Departure Worked");
            setSearch("");
          } else {
            setArrival({ city: data.item.city, code: data.item.code });
            console.log("Set Arrival Worked");
            setSearch("");
          }
        }}
        className="mb-4"
      >
        <Text className="font-[500] ml-1">
          {data.item.city}, <Text className="ml-0"> {data.item.code} </Text>
        </Text>
        <Text className="font-light"> {data.item.country} </Text>
      </Pressable>
    );
  }

  return (
    <View>
      <View className="w-full h-14 bg-[#1e71bb]/80 flex flex-row items-center px-2 relative">
        <Ionicons
          name="arrow-back-sharp"
          size={36}
          color="white"
          onPress={() => setPlaceVisible(false)}
        />
        <Text className="font-normal text-lg tracking-wide ml-4 text-white">
          Select Route
        </Text>
      </View>
      <View className="flex flex-row h-[141px] ">
        <View className="flex  w-8 justify-center bg-gray-200/90 items-center">
          <View
            className={`${
              !departure ? "bg-blue-400 " : "bg-white"
            } w-3 h-3 rounded-full  mt-3 `}
          ></View>
          <View className="h-14 w-[2px] bg-gray-300/70"></View>
          <View
            className={`${
              departure ? "bg-blue-400 border-blue-300 " : "bg-white"
            } w-3 h-3 rounded-full  `}
          ></View>
        </View>
        <View className="flex w-full bg-gray-300/50 flex-col justify-around items-start ">
          <Text className="text-xs ml-3">From</Text>
          <Pressable
            onPress={() => setWay(1)}
            className="bg-gray-300 w-3/4 -mt-3 h-10 ml-2 rounded-xl flex  items-start"
          >
            <TextInput
              editable
              maxLength={40}
              onChangeText={(text) => {
                setSearch(text);
                //console.log(text);
              }}
              value={departure ? departure?.code : search}
              style={{
                padding: 10,
                marginLeft: 0,
                //backgroundColor: "purple",
                width: 290,
                borderRadius: 16,
              }}
              onFocus={() => setWay(1)}
              placeholder="Make a Selection"
            />
          </Pressable>
          <Text className="text-xs -mt-2 ml-3">To</Text>
          <Pressable
            onPress={() => setWay(2)}
            className="bg-gray-300 -mt-3 w-3/4 h-10 ml-2 border-blue-500  rounded-xl flex items-start"
          >
            <TextInput
              editable={() => (departure ? "true" : "false")}
              maxLength={40}
              onChangeText={(text) => {
                setSearch(text);
                //console.log(text);
              }}
              value={arrival ? arrival?.code : search}
              style={{
                padding: 10,
                marginLeft: 0,
                //backgroundColor: "purple",
                width: 290,
                borderRadius: 16,
              }}
              onFocus={() => setWay(2)}
              placeholder="Make a Selection"
            />
          </Pressable>
        </View>
      </View>
      <View className="py-2 px-4">
        <Text className="font-bold text-base mb-2">All</Text>
        <FlatList
          renderItem={renderAirportSearch}
          keyExtractor={(item) => item.code}
          data={data}
        />
      </View>

      {/* After Selection */}
      {departure && arrival && (
        <View className=" absolute">
          <Pressable
            onPress={() => {
              getRouteInfo([departure, arrival]);
              console.log(departure, arrival);
              setPlaceVisible(false);
            }}
            className="bg-blue-400 w-96 h-16 left-1 top-[655px] flex justify-center items-center rounded-full "
          >
            <Text className="text-white text-lg">Confirm Route</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default PlaceSearch;
