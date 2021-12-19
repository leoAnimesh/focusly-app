import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SIZES } from "../Styles/Constants";

const Badge = ({ text, COLOR, SetToggle }) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={() => SetToggle(text)}
      style={{
        backgroundColor: colors.card,
        marginBottom: SIZES.sm,
        padding: SIZES.sm,
        borderRadius: SIZES.sm,
        flexDirection: "row",
        alignItems: "center",
        marginRight: SIZES.sm,
      }}
    >
      <View
        style={{
          width: SIZES.sm,
          height: SIZES.sm,
          backgroundColor: COLOR,
          borderRadius: SIZES.sm,
          marginRight: SIZES.sm,
        }}
      ></View>
      <Text style={{ color: colors.text }}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Badge;
