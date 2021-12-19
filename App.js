import React, { useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FocusContext } from "./src/context/Focus";
import { DarkColors, LightColors } from "./src/Styles/Constants";
import Home from "./src/Screens/Home";
import AddTasks from "./src/Screens/AddTasks";
import FocusPage from "./src/Screens/FocusPage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

const Dark = {
  dark: true,
  ...DarkTheme,
  colors: {
    primary: DarkColors.primary,
    background: DarkColors.backgroud,
    card: DarkColors.card,
    text: DarkColors.text,
  },
};

const Light = {
  dark: false,
  ...DefaultTheme,
  colors: {
    primary: LightColors.primary,
    background: LightColors.backgroud,
    card: LightColors.card,
    text: LightColors.text,
  },
};

const App = () => {
  const isDarkMode = useColorScheme() === "dark";
  const [Data, setData] = useState([]);
  useEffect(async () => {
    try {
      const value = await JSON.parse(
        await AsyncStorage.getItem("FOCUSLY::DATA")
      );
      if (value) {
        setData(value);
      }
    } catch (error) {
      Alert(error);
    }
  }, []);

  useEffect(async () => {
    if (Data.length !== 0) {
      try {
        await AsyncStorage.setItem("FOCUSLY::DATA", JSON.stringify(Data));
      } catch (error) {
        Alert(error);
      }
    } else {
      try {
        await AsyncStorage.removeItem("FOCUSLY::DATA");
      } catch (error) {
        Alert(error);
      }
    }
  }, [Data]);
  return (
    <FocusContext.Provider value={{ Data, setData }}>
      <NavigationContainer theme={isDarkMode ? Dark : Light}>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ animation: "slide_from_right" }}
        >
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddTasks"
            component={AddTasks}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Focus"
            component={FocusPage}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </FocusContext.Provider>
  );
};

export default App;
