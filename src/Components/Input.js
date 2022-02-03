import { TextInput } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { SIZES } from "../Styles/Constants";

const Input = ({ ...otherprops }) => {
  const { colors } = useTheme();
  return (
    <TextInput
      {...otherprops}
      style={{
        backgroundColor: colors.card,
        borderRadius: SIZES.sm,
        paddingHorizontal: SIZES.md,
        marginBottom: SIZES.md,
        height: 50,
        color: colors.text,
      }}
    />
  );
};

export default Input;
