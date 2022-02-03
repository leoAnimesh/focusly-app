import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SIZES } from "../Styles/Constants";
import { useTheme } from "@react-navigation/native";

const Toggle = ({ value, setValue, title }) => {
  const { colors } = useTheme();
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <TouchableOpacity
        onPress={() => setValue(!value)}
        style={{
          width: SIZES.md,
          height: SIZES.md,
          backgroundColor: value ? colors.primary : colors.card,
          borderWidth: 2,
          borderColor: colors.text,
          borderRadius: SIZES.ss,
          marginRight: SIZES.sm + 5,
        }}
      ></TouchableOpacity>
      <Text
        style={{ fontSize: SIZES.sm + 5, color: colors.text, marginBottom: 3 }}
      >
        {title}
      </Text>
    </View>
  );
};

export default Toggle;
