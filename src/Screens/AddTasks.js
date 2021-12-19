import { NavigationContainer, useTheme } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  useColorScheme,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DarkColors, LightColors, SIZES } from "../Styles/Constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FocusContext } from "../context/Focus";
import uuid from "react-native-uuid";

const AddTasks = ({ navigation }) => {
  const { Data, setData } = useContext(FocusContext);
  const [title, setTitle] = useState("");
  const [subText, SetsubText] = useState("");
  const [Time, setTime] = useState(20);
  const [Set, setSets] = useState(1);
  const [Priority, SetPriority] = useState("Low");
  const [check, setCheck] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const { colors } = useTheme();
  const isDarkMode = useColorScheme() === "dark";
  const backgroundStyle = {
    flex: 1,
    padding: 20,
    marginTop: 10,
    backgroundColor: isDarkMode ? DarkColors.backgroud : LightColors.backgroud,
  };

  const timeBtn = [20, 30, 40, 50, 60];
  const Sets = [1, 2, 3, 4, 5];
  const priority = ["Low", "Medium", "High"];

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

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
    setData([
      ...Data,
      {
        id: uuid.v4(),
        focus: title,
        time: Time,
        sets: Set,
        priority: Priority,
        date: date.toLocaleString(),
        remainder: check,
        completed: false,
      },
    ]);
    if (check === true) {
      setNotfication(date, "It's Time to Focus on ", title);
    }
    setTitle("");
    setDate(new Date(Date.now()));
    setTime(20);
    setSets(1);
    setCheck(false);
    navigation.navigate("Home");
  };

  console.log(Data);

  return (
    <SafeAreaView style={backgroundStyle}>
      <Text
        style={{
          fontSize: SIZES.md + 5,
          color: colors.text,
          marginBottom: SIZES.md,
        }}
      >
        Add your Tasks
      </Text>
      <View style={{ flex: 1 }}>
        <TextInput
          placeholder="Add task"
          placeholderTextColor={colors.text}
          onChangeText={(text) => {
            setTitle(text);
          }}
          value={title}
          style={{
            backgroundColor: colors.card,
            borderRadius: SIZES.sm,
            paddingHorizontal: SIZES.md,
            marginBottom: SIZES.md,
            height: 50,
            color: colors.text,
          }}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: SIZES.lg,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => setCheck(!check)}
              style={{
                width: SIZES.md,
                height: SIZES.md,
                backgroundColor: check ? colors.primary : colors.card,
                borderWidth: 2,
                borderColor: colors.text,
                borderRadius: SIZES.ss,
                marginRight: SIZES.sm,
              }}
            ></TouchableOpacity>
            <Text style={{ fontSize: SIZES.sm + 5, color: colors.text }}>
              Remainder
            </Text>
          </View>
          {check ? (
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={showDatepicker}>
                <MaterialCommunityIcons
                  name="calendar"
                  size={20}
                  color={colors.text}
                  style={{ marginRight: SIZES.sm }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={showTimepicker}>
                <MaterialCommunityIcons
                  name="clock"
                  size={20}
                  color={colors.text}
                  style={{ marginRight: SIZES.sm }}
                />
              </TouchableOpacity>
            </View>
          ) : null}
        </View>

        <View style={{ marginBottom: SIZES.md }}>
          <Text
            style={{
              fontSize: SIZES.md - 2,
              color: colors.text,
              marginBottom: SIZES.sm + 5,
            }}
          >
            Time - min
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {timeBtn.map((val, idx) => (
              <TouchableOpacity
                onPress={() => {
                  setTime(val);
                }}
                key={idx}
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: colors.card,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: SIZES.sm,
                  borderWidth: Time === val || Set === val ? 3 : 0,
                  borderColor: DarkColors.primary,
                }}
              >
                <Text style={{ color: colors.text }}>{val}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={{ marginBottom: SIZES.md }}>
          <Text
            style={{
              fontSize: SIZES.md - 2,
              color: colors.text,
              marginBottom: SIZES.sm + 5,
            }}
          >
            Sets
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {Sets.map((val, idx) => (
              <TouchableOpacity
                onPress={() => {
                  setSets(val);
                }}
                key={idx}
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: colors.card,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: SIZES.sm,
                  borderWidth: Time && Set === val ? 3 : 0,
                  borderColor: DarkColors.primary,
                }}
              >
                <Text style={{ color: colors.text }}>{val}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={{ marginBottom: SIZES.md }}>
          <Text
            style={{
              fontSize: SIZES.md - 2,
              color: colors.text,
              marginBottom: SIZES.sm + 5,
            }}
          >
            Priority
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {priority.map((val, idx) => (
              <TouchableOpacity
                onPress={() => {
                  SetPriority(val);
                }}
                key={idx}
                style={{
                  width: 100,
                  height: 50,
                  backgroundColor: colors.card,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: SIZES.sm,
                  borderWidth: Time && Priority === val ? 3 : 0,
                  borderColor: DarkColors.primary,
                }}
              >
                <Text style={{ color: colors.text }}>{val}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          onPress={handelSubmit}
          disabled={title === ""}
          style={{
            backgroundColor: title === "" ? colors.card : colors.primary,
            width: 110,
            height: 45,
            borderRadius: 30,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            bottom: 0,
            right: 10,
          }}
        >
          <Text style={{ fontSize: SIZES.sm + 5, color: "#fff" }}>Save 👌</Text>
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={false}
            display="default"
            onChange={onChange}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default AddTasks;
