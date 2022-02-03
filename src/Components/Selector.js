import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { DarkColors, SIZES } from "../Styles/Constants";
import { useTheme } from "@react-navigation/native";

const Selector = ({ elements, value, setValue, title }) => {
  const { colors } = useTheme();
  return (
    <View style={{ marginBottom: SIZES.md }}>
      <Text
        style={{
          fontSize: SIZES.md - 2,
          color: colors.text,
          marginBottom: SIZES.sm + 5,
        }}
      >
        {title}
      </Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {elements.map((val, idx) => (
          <TouchableOpacity
            onPress={() => {
              setValue(val);
            }}
            key={idx}
            style={{
              flex: 1,
              paddingVertical: 12,
              marginRight: 12,
              backgroundColor: colors.card,
              justifyContent: "space-evenly",
              alignItems: "center",
              borderRadius: SIZES.sm,
              borderWidth: value === val ? 3 : 0,
              borderColor: DarkColors.primary,
            }}
          >
            <Text style={{ color: colors.text }}>{val}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Selector;
