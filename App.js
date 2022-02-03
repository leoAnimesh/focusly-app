import React, { useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  useTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DarkColors, LightColors } from "./src/Styles/Constants";
import AddFocusTasks from "./src/Screens/Focus/AddFocusTasks";
import FocusPage from "./src/Screens/Focus/FocusPage";
import FocusHome from "./src/Screens/Focus/FocusHome";
import TasksHome from "./src/Screens/Tasks/TasksHome";
import NotesHome from "./src/Screens/Notes/NotesHome";
import ExpenseHome from "./src/Screens/Expense/ExpenseHome";
import { FocusProvider } from "./src/context/Focus/FocusState";
import { FontAwesome } from "@expo/vector-icons";
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

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
  return (
    <NavigationContainer theme={isDarkMode ? Dark : Light}>
      <Drawer.Navigator screenOptions={{}}>
        <Drawer.Screen
          name="Focus"
          options={{
            drawerActiveTintColor: isDarkMode
              ? DarkColors.text
              : LightColors.text,
            drawerIcon: ({ color }) => (
              <FontAwesome name="trophy" size={20} color={color} />
            ),
          }}
        >
          {() => (
            <FocusProvider>
              <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{ animation: "slide_from_right" }}
              >
                <Stack.Screen
                  name="Home"
                  component={FocusHome}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="AddFocusTasks"
                  component={AddFocusTasks}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Focusing"
                  component={FocusPage}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
            </FocusProvider>
          )}
        </Drawer.Screen>
        <Drawer.Screen
          name="Tasks"
          options={{
            drawerActiveTintColor: isDarkMode
              ? DarkColors.text
              : LightColors.text,
            drawerIcon: ({ color }) => (
              <FontAwesome name="tasks" size={20} color={color} />
            ),
          }}
        >
          {() => (
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{ animation: "slide_from_right" }}
            >
              <Stack.Screen
                name="Home"
                component={TasksHome}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          )}
        </Drawer.Screen>
        <Drawer.Screen
          name="Notes"
          options={{
            drawerActiveTintColor: isDarkMode
              ? DarkColors.text
              : LightColors.text,
            drawerIcon: ({ color }) => (
              <FontAwesome name="sticky-note" size={20} color={color} />
            ),
          }}
        >
          {() => (
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{ animation: "slide_from_right" }}
            >
              <Stack.Screen
                name="Home"
                component={NotesHome}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          )}
        </Drawer.Screen>
        <Drawer.Screen
          name="Expense"
          options={{
            drawerActiveTintColor: isDarkMode
              ? DarkColors.text
              : LightColors.text,
            drawerIcon: ({ color }) => (
              <FontAwesome name="money" size={20} color={color} />
            ),
          }}
        >
          {() => (
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{ animation: "slide_from_right" }}
            >
              <Stack.Screen
                name="Home"
                component={ExpenseHome}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
