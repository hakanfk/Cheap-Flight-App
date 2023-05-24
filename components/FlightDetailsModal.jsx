import { View, Text, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { getFlightInformation } from "../util/skyApi";
import { Ionicons } from "@expo/vector-icons";
import Button from "./Button";
import { useDispatch } from "react-redux";
//import { setFlight } from "../store/ticketSlice";

const FlightDetailsModal = ({ route, navigation }) => {
  const [flightData, setFlightData] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [color, setColor] = useState();
  const { id, origin, destination, date } = route.params;

  //React-Redux
  //const dispatch = useDispatch();

  useEffect(() => {
    setColor("");
    async function getInfo(id, origin, destination, date) {
      try {
        setisLoading(true);
        const result = await getFlightInformation(
          id,
          origin,
          destination,
          date
        );

        setFlightData(result.data);
        console.log(flightData);
        if (flightData) {
          console.log("Yes Color");
          setColor(
            result.data.legs[0].segments[0].marketingCarrier.brandColor.toUpperCase()
          );
          setisLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getInfo(id, origin, destination, date);
    console.log(id, origin, destination, date);
  }, [id]);

  function handleBack() {
    //setFlightData("");
    navigation.navigate("SearchFlight", {
      departure: origin,
      arrival: destination,
      date: date,
    });
  }

  /* function handleTicketBuy() {
    dispatch(
      setFlight({
        origin: origin,
        destination: destination,
        flightId: id,
        date: date,
      })
    );
  } */

  if (isLoading) {
    return (
      <View className="flex justify-center items-center h-full w-full">
        <Text className="text-lg text-blue-500 tracking-[15px]">Loading</Text>
      </View>
    );
  }

  return (
    <View className="h-full w-full flex flex-col">
      {/*
       */}
      <View className="bg-blue-900/90 w-full h-44 relative">
        <View className="opacity-10  w-full ">
          <Image
            source={require("../assets/pngwing.png")}
            style={{ width: 360, height: 180 }}
            resizeMode="cover"
          />
        </View>
        <View className="absolute top-14 left-4">
          <Ionicons
            name="arrow-back-sharp"
            size={36}
            color="white"
            onPress={handleBack}
          />
        </View>
        <Text className="absolute top-14 left-36 text-lg text-white">
          {" "}
          Flight Details{" "}
        </Text>
      </View>
      <View className="w-full h-full flex-grow rounded-3xl -mt-16 bg-gray-200">
        <View className="mt-4 mx-2 flex items-center justify-center">
          <View className="-mt-2">
            <Image
              source={{
                uri: flightData?.legs[0]?.segments[0]?.marketingCarrier.logo,
              }}
              style={{ height: 66, width: 96 }}
              resizeMode="contain"
            />
            <Text className="mt-3 -ml-3 text-gray-700/90 tracking-widest">
              {flightData?.legs[0]?.segments[0]?.marketingCarrier.name}
            </Text>
          </View>
        </View>
        <View className="flex flex-col mt-4 ">
          {/* 
          
              First Row
          */}

          <View className="flex flex-row justify-around items-center">
            <View className="flex justify-center items-center">
              <Text>{flightData?.legs[0]?.origin?.city}</Text>
              <Text className="text-lg font-bold"> {origin} </Text>
              <Text> {flightData?.legs[0]?.departure.slice(11, 16)} </Text>
            </View>
            <View className="flex flex-row justify-center items-center">
              <View className="w-12 h-[2px] bg-gray-400 mr-2"></View>
              <View className="flex justify-center items-center mt-4">
                <Ionicons name="airplane" size={24} color="#1e91bb" />
                <Text className="font-light mt-2">
                  {flightData?.legs[0]?.duration} min
                </Text>
              </View>
              <View className="w-12 h-[2px] bg-gray-400 ml-2"></View>
            </View>
            <View className="flex justify-center items-center">
              <Text>{flightData?.legs[0]?.destination?.city}</Text>
              <Text className="text-lg font-bold"> {destination} </Text>
              <Text> {flightData?.legs[0]?.arrival?.slice(11, 16)} </Text>
            </View>
          </View>

          {/* 
          
          Second Row
          
          */}
          <View className="flex flex-row justify-around items-center mt-8">
            <View className="flex justify-center items-center">
              <Text className="text-lg font-bold"> Flight Type </Text>
              <Text> Standard </Text>
            </View>
            <View className="flex justify-center items-center">
              <Text className="text-lg font-bold">Flight Code</Text>
              <Text> {flightData?.legs[0].segments[0].flightNumber} </Text>
            </View>
            <View className="flex justify-center items-center">
              <Text className="text-lg font-bold"> Model </Text>
              <Text> {flightData?.linked?.aircrafts[0]?.model} </Text>
            </View>
          </View>

          {/* 
          
            Third Row

          */}
          <View className="flex flex-row justify-around items-center mt-8">
            <View className="flex justify-center items-center">
              <Text className="text-lg font-bold"> Passenger Name </Text>
              <Text> Hakan Karaaslan </Text>
            </View>
            <View className="flex justify-center items-center">
              <Text className="text-lg font-bold"> Price </Text>
              <Text> ${flightData?.pricingOptions[0].totalPrice} </Text>
            </View>
          </View>

          {/* 
          
            Pay Button
          
          */}
          <View className="mt-4 flex justify-center items-center">
            <Button
              onPressProp={() => {}}
              label={"Buy Ticket"}
              bg="bg-blue-900/70"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default FlightDetailsModal;
