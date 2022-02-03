import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SIZES } from "../Styles/Constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

const DTPicker = ({ value, setValue }) => {
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const { colors } = useTheme();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setValue(currentDate);
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
  return (
    <>
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
        {show ? (
          <DateTimePicker
            testID="dateTimePicker"
            value={value}
            mode={mode}
            is24Hour={false}
            display="default"
            onChange={onChange}
          />
        ) : null}
      </View>
    </>
  );
};

export default DTPicker;
