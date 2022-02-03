import { View, Text, useColorScheme, SafeAreaView, Button } from "react-native";
import React from "react";
import Status from "../../Components/Status";
import { DarkColors, LightColors } from "../../Styles/Constants";
const ExpenseHome = ({ navigation }) => {
  const isDarkMode = useColorScheme() === "dark";
  const backgroundStyle = {
    flex: 1,
    padding: 20,
    marginTop: 5,
    backgroundColor: isDarkMode ? DarkColors.backgroud : LightColors.backgroud,
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <Status img={require("../../assets/Images/expense.png")} />
    </SafeAreaView>
  );
};

export default ExpenseHome;
