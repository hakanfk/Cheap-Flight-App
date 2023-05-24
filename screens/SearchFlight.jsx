import { View, Text, Alert, FlatList, Pressable, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import { getFlight } from "../util/skyApi";
import { Ionicons } from "@expo/vector-icons";
import FlightDetailsModal from "../components/FlightDetailsModal";

const SearchFlight = ({ route, navigation }) => {
  const { departure, arrival, date } = route.params;
  const [isLoading, setisLoading] = useState(true);
  const [data, setData] = useState([]);
  //const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function getFli(origin, dest, date) {
      try {
        setisLoading(true);
        const res = await getFlight(origin, dest, date);
        setisLoading(false);
        //console.log("This is it");
        if (res.data?.data) {
          //console.log(res.data?.data[0].legs[0].origin);
          for (let i = 0; i < res.data?.data.length; i++) {
            res.data.data[i].uniqueId = String(i);
          }
          setData(res.data?.data.slice(0, 9));
        } else {
          Alert.alert("No data");
        }
        //return res;
      } catch (error) {
        Alert.alert("Something Went Wrong");
      }
    }

    //getFli(departure, arrival, date);
    getFli(departure, arrival, date);
    //console.log("Data price");
    //console.log(data[0]);
  }, [departure, arrival, date]);

  function renderPrices({ item }) {
    /* console.log("--------------");
    console.log(itemData.item);
    console.log("--------------"); */
    return (
      <Pressable
        onPress={() => {
          console.log("*****------onPres-------******");
          console.log(item.id);
          //setIsModalOpen(true);
          navigation.navigate("FlightDetailsModal", {
            origin: item?.legs[0]?.origin.display_code,
            destination: item?.legs[0]?.destination.display_code,
            id: item.id,
            date: date,
          });
        }}
        className=" h-28 mx-3  flex  my-2 justify-around rounded-xl border-[0.3px] "
      >
        {/* Modal */}
        {/* <Modal
          visible={isModalOpen}
          animationType="slide"
          onRequestClose={() => {
            //Alert.alert("Modal has been closed.");
            setIsModalOpen(false);
          }}
        > */}
        {/* <FlightDetailsModal
          origin={item?.legs[0]?.origin.display_code}
          destination={item?.legs[0]?.destination.display_code}
          id={item.id}
          date={date}
          //setIsModalOpen={setIsModalOpen}
        /> */}
        {/*  </Modal> */}

        {/*------- Not Modal -------*/}
        <View className="flex flex-col ">
          <View className="flex flex-row justify-center ml-1  items-center">
            <View className="h-full flex justify-center items-center">
              <Text className="text-xs font-light">
                {item.legs[0]?.origin.name}
              </Text>
              <Text className="text-lg font-normal"> {departure} </Text>
              <Text className="text-xs font-light">
                {" "}
                {item.legs[0]?.departure.slice(-8, -3)}{" "}
              </Text>
            </View>
            <View className="h-full flex justify-center items-center">
              <Text className="font-normal">{date}</Text>
              <View className="flex flex-row justify-center items-center">
                <View className="w-16 h-[2px] bg-gray-200 mr-2"></View>
                <Ionicons name="airplane" size={24} color="#1e91bb" />
                <View className="w-16 h-[2px] bg-gray-200 ml-2"></View>
              </View>
              <Text className="font-normal">
                {" "}
                {item.totalDuration} Minutes{" "}
              </Text>
            </View>
            <View className="h-full flex justify-center items-center">
              <Text className="text-xs font-light">
                {item.legs[0]?.destination.name}
              </Text>
              <Text className="text-lg font-normal">{arrival}</Text>
              <Text className="text-xs font-light">
                {" "}
                {item.legs[0]?.arrival.slice(-8, -3)}{" "}
              </Text>
            </View>
            {/* <View className="h-full ml-1 flex-grow bg-blue-700/50 flex justify-center items-center rounded-xl">
              <Text className="text-base ">
                {" "}
                ${itemData.item?.price?.amount}{" "}
              </Text>
            </View> */}
          </View>
        </View>
        <View className="-mt-4 ml-2 gap-x-4 flex flex-row justify-around">
          <Text className="text-base font-light tracking-wider">
            {item?.legs[0]?.carriers[0]?.name}
          </Text>
          <Text className="text-blue-500 text-lg font-bold mr-2">
            {" "}
            ${item?.price?.amount}{" "}
          </Text>
        </View>
      </Pressable>
    );
  }

  if (isLoading) {
    return (
      <View className="flex justify-center items-center h-full w-full">
        <Text className="text-lg text-blue-500 tracking-[15px]">Loading</Text>
      </View>
    );
  }

  return (
    <View className=" ">
      {/* TopBar */}
      <View className="w-full h-24 bg-blue-400/80 ">
        <View className="flex flex-row justify-between mt-12 mx-3">
          <Ionicons
            onPress={() => {
              setData([]);
              navigation.goBack();
            }}
            name="arrow-back-sharp"
            size={36}
            color="white"
          />
          <Text className="font-normal text-xl tracking-wide ml-1 mt-1 text-white">
            {departure}-{arrival}
          </Text>
          <Text className="font-normal mt-1 text-lg tracking-wide mr-1 text-white">
            Cancel
          </Text>
        </View>
      </View>

      {/* Horizontal ScrollView for Day and Price */}
      <View className="w-full h-14 flex justify-center items-center border-b-[0.5px]">
        <Text className="text-lg font-normal text-blue-400"> {date} </Text>
        <Text className="text-lg font-normal text-blue-400">
          $ {data[0]?.price.amount}{" "}
        </Text>
      </View>
      <Text className="ml-2">Top 10 Flight by Price</Text>
      <FlatList
        data={data}
        renderItem={renderPrices}
        keyExtractor={(item) => String(item.uniqueId)}
      />
    </View>
  );
};

export default SearchFlight;
