import {
  View,
  Text,
  useColorScheme,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Status from "../../Components/Status";
import { DarkColors, LightColors, SIZES } from "../../Styles/Constants";
import { useTheme } from "@react-navigation/native";
import Badge from "../../Components/Badge";
import Toggle from "../../Components/Toggle";
import Input from "../../Components/Input";

const TasksHome = ({ navigation }) => {
  const [toggle, SetToggle] = useState("Pending");
  const [Mark, SetMark] = useState(false);
  const isDarkMode = useColorScheme() === "dark";
  const backgroundStyle = {
    flex: 1,
    padding: 20,
    marginTop: 5,
    backgroundColor: isDarkMode ? DarkColors.backgroud : LightColors.backgroud,
  };
  const { colors } = useTheme();
  return (
    <SafeAreaView style={backgroundStyle}>
      <Status img={require("../../assets/Images/tasks.png")} />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginHorizontal: 10,
          marginVertical: 20,
        }}
      >
        <Text style={{ color: colors.text, fontSize: 18 }}>All Tasks</Text>
      </View>

      <View style={{ flexDirection: "row", marginBottom: SIZES.sm }}>
        <Badge text="Pending" COLOR="red" SetToggle={SetToggle} />
        <Badge text="Completed" COLOR="green" SetToggle={SetToggle} />
      </View>

      <View>
        <View
          style={{
            backgroundColor: colors.card,
            paddingVertical: 12,
            paddingHorizontal: 15,
            borderRadius: 10,
            borderLeftColor: "red",
            borderLeftWidth: 3,
          }}
        >
          <Toggle title="Do this" value={Mark} setValue={SetMark} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TasksHome;
