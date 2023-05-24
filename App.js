import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import NativeStack from "./navigation/NativeStack";
import Tabs from "./navigation/Tabs";

export default function App() {
  const i = 2;
  return (
    /*     <Provider store={store}>
     */ <NavigationContainer>
      {i == 2 && <Tabs />}
      {i !== 2 && <NativeStack />}
    </NavigationContainer>
    /*     </Provider>*/
  );
}
