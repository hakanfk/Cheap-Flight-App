import { View, Text, Pressable, Modal } from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Button from "./Button";
import DateModal from "./DateModal";
import PlaceSearchModal from "./PlaceSearchModal";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Flight = () => {
  const navigation = useNavigation();

  const [calendarVisible, setcalendarVisible] = useState(false);
  const [placeVisible, setPlaceVisible] = useState(false);

  //Flight Information
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [date, setdate] = useState("");

  function getDateInfo(data) {
    console.log(data);
    setdate(data);
  }

  function getRouteInfo(data) {
    console.log("Flight Page" + data);
    setDeparture(data[0].code);
    setArrival(data[1].code);
  }

  const storeData = async () => {
    const value = {
      departure,
      arrival,
      date,
    };

    try {
      const stringifyValue = JSON.stringify(value);
      await AsyncStorage.setItem("lastSearches", stringifyValue);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  return (
    <View>
      <View className="w-[92%] flex mx-auto bg-[#e6e6e9]/70 mt-3 h-28 rounded-xl">
        {/* ------------------- */}
        {/* Destination-Arrival */}
        <Pressable
          onPress={() => setPlaceVisible(true)}
          className="w-[90%] flex flex-col justify-center h-full items-start mx-auto my-auto "
        >
          <Pressable
            onPress={() => setPlaceVisible(true)}
            className="flex items-center flex-row mb-2 "
          >
            <MaterialCommunityIcons
              name="airplane-takeoff"
              size={30}
              color="gray"
            />
            <Text className="font-[500] tracking-wider  text-base text-[#222121] ml-3 ">
              {departure ? departure : "Select Route"}
            </Text>
            <Modal
              visible={placeVisible}
              animationType="slide"
              onRequestClose={() => {
                //Alert.alert("Modal has been closed.");
                setPlaceVisible(false);
              }}
            >
              <PlaceSearchModal
                setPlaceVisible={setPlaceVisible}
                getRouteInfo={getRouteInfo}
              />
            </Modal>
          </Pressable>
          <View className="w-5/6 h-[3px] relative  bg-gray-400/20"></View>
          <Pressable className="absolute right-2 w-10 h-10 flex justify-center items-center rounded-full bg-white ">
            <Ionicons name="swap-vertical" size={24} color="black" />
          </Pressable>

          <Pressable
            onPress={() => setPlaceVisible(true)}
            className="mt-2 flex flex-row"
          >
            <MaterialCommunityIcons
              name="airplane-landing"
              size={30}
              color="gray"
            />
            <Text className="font-[500] tracking-wider  text-base text-[#222121] ml-3 ">
              {arrival ? arrival : "Select Route"}
            </Text>
          </Pressable>
        </Pressable>
      </View>

      {/* --------------- */}
      {/* Date */}
      <Pressable
        onPress={() => setcalendarVisible(true)}
        className=" w-[92%] mx-auto bg-[#e6e6e9]/70 mt-2 h-14 rounded-xl flex justify-center "
      >
        <View className="flex-row justify-start items-center flex w-[90%] mx-auto">
          <Ionicons name="calendar" size={28} color="gray" />
          <Text className="font-[500]   text-base text-[#222121] ml-3 ">
            {!date ? "Select Departure Date" : date}
          </Text>
          <Modal
            visible={calendarVisible}
            animationType="slide"
            transparent={false}
            onRequestClose={() => {
              //Alert.alert("Modal has been closed.");
              setcalendarVisible(false);
            }}
          >
            <DateModal
              isRoundTrip={false}
              setcalendarVisible={setcalendarVisible}
              getDate={getDateInfo}
            />
          </Modal>
        </View>
      </Pressable>

      {/* --------------- */}
      {/* Passenger */}
      <Pressable className=" w-[92%] mx-auto bg-[#e6e6e9]/70 mt-2 h-14 rounded-xl flex justify-center ">
        <View className="flex-row justify-start items-center flex w-[90%] mx-auto">
          <Ionicons name="person" size={28} color="gray" />
          <Text className="font-[500]   text-base text-[#222121] ml-3 ">
            1 Passenger
          </Text>
        </View>
      </Pressable>

      {/* --------------- */}
      {/* Search Flight */}
      <Pressable
        onPress={() => {
          storeData();
          navigation.navigate("SearchFlight", {
            departure: departure,
            arrival: arrival,
            date: date,
          });
        }}
        android_ripple={{ color: "rgb(39 39 42)", radius: 145 }}
        className={` w-3/4 h-12 rounded-full mt-6 mx-auto flex justify-center
      items-center overflow-hidden bg-black `}
      >
        <Text className="text-[#edeaea]  text-[18px] tracking-wider">
          Search Flight
        </Text>
      </Pressable>
    </View>
  );
};

export default Flight;
