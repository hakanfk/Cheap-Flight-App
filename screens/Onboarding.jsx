import { View, Text, Pressable, SafeAreaView, Image } from "react-native";
import React from "react";
import Button from "../components/Button";

const Lol = ({ navigation }) => {
  function handlePress() {
    navigation.navigate("SignUp");
  }

  return (
    <View className="h-full w-screen bg-zinc-800 z-0">
      <View className="mt-4 z-10 flex  items-center relative">
        <Text className="absolute top-4 uppercase text-3xl text-slate-300 mt-4 tracking-[16px]">
          Nyasar
        </Text>
        <Image
          source={require("../assets/paris.png")}
          style={{ width: 389, height: 460, marginTop: 60 }}
        />
        <Image
          source={require("../assets/plane.png")}
          style={{ width: 320, height: 160, position: "absolute", top: 220 }}
        />
        <Text className="text-2xl px-16 font-extrabold tracking-wider -mt-20  text-slate-300 text-center">
          Find Your Flight in Just One Click
        </Text>
        <Text className="font-light text-md text-gray-400 tracking-wide px-6 text-center mt-4">
          Easy way to book your flight anytime and anywhere with just one click
        </Text>
        <Button label="Get Started" onPressProp={handlePress} bg="bg-white" />
        <View className="mt-4 flex flex-row">
          <Text className="text-gray-400">Already Have an Account? </Text>
          <Text className="text-white "> Log In</Text>
        </View>
      </View>
    </View>
  );
};

export default Lol;
