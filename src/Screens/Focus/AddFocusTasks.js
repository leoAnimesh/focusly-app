import { useTheme } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { View, Text, useColorScheme, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DarkColors, LightColors, SIZES } from "../../Styles/Constants";
import * as Notifications from "expo-notifications";
import uuid from "react-native-uuid";
import { FocusContext } from "../../context/Focus/FocusState";
import moment from "moment";
import Input from "../../Components/Input";
import Selector from "../../Components/Selector";
import DTPicker from "../../Components/DTPicker";
import Toggle from "../../Components/Toggle";
import Button from "../../Components/Button";

const AddTasks = ({ navigation }) => {
  const { addFocusTasks } = useContext(FocusContext);
  const [title, setTitle] = useState("");
  const [Time, setTime] = useState(20);
  const [Set, setSet] = useState(1);
  const [Priority, SetPriority] = useState("Low");
  const [check, setCheck] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));
  const { colors } = useTheme();
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 5,
    backgroundColor: isDarkMode ? DarkColors.backgroud : LightColors.backgroud,
  };

  const timeBtn = [20, 30, 40, 50, 60];
  const Sets = [1, 2, 3, 4, 5];
  const priority = ["Low", "Medium", "High"];

  const setNotfication = (date, title, body) => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });

    Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
      },
      trigger: {
        date: date,
      },
    });
  };

  const handelSubmit = () => {
    addFocusTasks({
      id: uuid.v4(),
      focus: title,
      time: Time,
      sets: Set,
      priority: Priority,
      date: moment(date).format("Do MMMM YY, h:mm a"),
      remainder: check,
      completed: false,
    });
    if (check === true) {
      setNotfication(date, "It's Time to Focus on ", title);
    }
    setTitle("");
    setDate(new Date(Date.now()));
    setTime(20);
    setSet(1);
    setCheck(false);
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
          marginHorizontal: 5,
        }}
      >
        <Text
          style={{
            fontSize: SIZES.md,
            color: colors.text,
          }}
        >
          Add your Tasks
        </Text>
        <Button onPress={handelSubmit} disabled={title === ""} title="save" />
      </View>
      <View style={{ flex: 1 }}>
        <Input
          placeholder="Add task"
          placeholderTextColor={colors.text}
          onChangeText={(text) => {
            setTitle(text);
          }}
          value={title}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: SIZES.lg,
          }}
        >
          <Toggle value={check} setValue={setCheck} title="Remainder" />
          {check ? <DTPicker value={date} setValue={setDate} /> : null}
        </View>
        <Selector
          elements={timeBtn}
          setValue={setTime}
          value={Time}
          title="Time - min"
        />
        <Selector elements={Sets} setValue={setSet} value={Set} title="Sets" />
        <Selector
          elements={priority}
          setValue={SetPriority}
          value={Priority}
          title="Priority"
        />
      </View>
    </SafeAreaView>
  );
};

export default AddTasks;
