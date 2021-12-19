import { useTheme } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  useColorScheme,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import Badge from "../Components/Badge";
import Tasks from "../Components/Tasks";
import { FocusContext } from "../context/Focus";
import { DarkColors, LightColors, SIZES } from "../Styles/Constants";
import PendingTask from "../Components/PendingTask";
import CompletedTask from "../Components/CompletedTask";

const Home = ({ navigation }) => {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    flex: 1,
    padding: 20,
    marginTop: 20,
    backgroundColor: isDarkMode ? DarkColors.backgroud : LightColors.backgroud,
  };
  const { colors } = useTheme();
  const { Data } = useContext(FocusContext);

  let CompletedTasks = Data.filter((val) => {
    if (val.completed === true) {
      return val;
    }
  });

  let PendingTasks = Data.filter((val) => {
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
        backgroundColor={
          isDarkMode ? DarkColors.backgroud : LightColors.backgroud
        }
      />
      <View style={{ paddingBottom: SIZES.md }}>
        <Text style={{ fontSize: SIZES.md + 5, color: colors.text }}>
          Focusly
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          backgroundColor: colors.card,
          paddingHorizontal: SIZES.sm + 5,
          paddingVertical: SIZES.md,
          borderRadius: SIZES.sm,
        }}
      >
        <View style={{ width: "70%" }}>
          <Text
            style={{
              fontSize: SIZES.md,
              marginBottom: SIZES.sm + 6,
              color: colors.text,
            }}
          >
            Daily Progress
          </Text>
          <Text
            style={{
              fontSize: SIZES.sm + 3,
              marginBottom: SIZES.ss + 4,
              color: colors.text,
            }}
          >
            👌 Completed : {CompletedTasks.length}
          </Text>
          <Text
            style={{
              fontSize: SIZES.sm + 3,
              marginBottom: SIZES.ss + 4,
              color: colors.text,
            }}
          >
            👎 Pending : {PendingTasks.length}
          </Text>
        </View>
        <View style={{ width: "30%" }}>
          <Image
            style={{ flex: 1, resizeMode: "contain", width: "100%" }}
            source={require("../assets/Images/focus.png")}
          />
        </View>
      </View>

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
          Task you have focused on{" "}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: colors.primary,
            width: 80,
            height: 30,
            borderRadius: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            navigation.navigate("AddTasks");
          }}
        >
          <Text
            style={{ fontSize: SIZES.sm + 5, fontWeight: "600", color: "#fff" }}
          >
            Add +
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row", marginBottom: SIZES.md }}>
        <Badge text="Pending" COLOR="red" SetToggle={SetToggle} />
        <Badge text="Completed" COLOR="green" SetToggle={SetToggle} />
      </View>

      <View style={{ flex: 1 }}>{section[`${toggle}`]}</View>
    </SafeAreaView>
  );
};

export default Home;
