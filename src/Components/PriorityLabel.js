import { View, Text } from "react-native";
import React from "react";
import { SIZES } from "../Styles/Constants";
import { useTheme } from "@react-navigation/native";

const PriorityLabel = ({ value }) => {
  const { colors } = useTheme();
  return (
    <View style={{ paddingHorizontal: 10 }}>
      <Text
        style={{
          backgroundColor: colors.primary,
          color: "#fff",
          fontSize: 12,
          paddingHorizontal: SIZES.ss + 3,
          paddingVertical: 1,
          marginTop: 2,
          borderRadius: 5,
        }}
      >
        {value}
      </Text>
    </View>
  );
};

export default PriorityLabel;
