import { useTheme } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  useColorScheme,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Badge from "../../Components/Badge";
import { FocusContext } from "../../context/Focus/FocusState";
import { DarkColors, LightColors, SIZES } from "../../Styles/Constants";
import PendingTask from "../../Components/Focus/PendingTask";
import CompletedTask from "../../Components/Focus/CompletedTask";
import Status from "../../Components/Status";
import Button from "../../Components/Button";

const FocusHome = ({ navigation }) => {
  const isDarkMode = useColorScheme() === "dark";
  const backgroundStyle = {
    flex: 1,
    padding: 20,
    marginTop: 5,
    backgroundColor: isDarkMode ? DarkColors.backgroud : LightColors.backgroud,
  };
  const { colors } = useTheme();
  const { FocusObject } = useContext(FocusContext);

  let CompletedTasks = FocusObject.filter((val) => {
    if (val.completed === true) {
      return val;
    }
  });

  let PendingTasks = FocusObject.filter((val) => {
    if (val.completed === false) {
      return val;
    }
  });

  const section = {
    Pending: <PendingTask Data={PendingTasks} navigation={navigation} />,
    Completed: <CompletedTask Data={CompletedTasks} navigation={navigation} />,
  };

  const [toggle, SetToggle] = useState("Pending");
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={isDarkMode ? DarkColors.card : LightColors.card}
      />
      <Status img={require("../../assets/Images/focus.png")} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginVertical: 20,
        }}
      >
        <Text
          style={{
            fontSize: SIZES.sm + 8,
            color: colors.text,
          }}
        >
          Task you have focused on
        </Text>
        <Button
          title="Add +"
          onPress={() => {
            navigation.navigate("AddFocusTasks");
          }}
        />
      </View>

      <View style={{ flexDirection: "row", marginBottom: SIZES.md }}>
        <Badge text="Pending" COLOR="red" SetToggle={SetToggle} />
        <Badge text="Completed" COLOR="green" SetToggle={SetToggle} />
      </View>

      <View style={{ flex: 1 }}>{section[`${toggle}`]}</View>
    </SafeAreaView>
  );
};

export default FocusHome;
