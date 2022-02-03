import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import { SIZES } from "../Styles/Constants";

export default function Button({ title, ...otherProps }) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      {...otherProps}
      style={{
        backgroundColor: colors.primary,
        width: 80,
        height: 35,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: SIZES.sm + 3,
          fontWeight: "600",
          color: "#fff",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
