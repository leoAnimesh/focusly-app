import { View, Text } from "react-native";
import React from "react";
import { SIZES } from "../Styles/Constants";
import { useTheme } from "@react-navigation/native";
import { Image } from "react-native";
const Status = ({ img }) => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        backgroundColor: colors.card,
        paddingHorizontal: SIZES.sm + 5,
        paddingVertical: SIZES.md,
        borderRadius: SIZES.sm,
      }}
    >
      <View style={{ width: "70%", marginLeft: 10 }}>
        <Text
          style={{
            fontSize: SIZES.md,
            marginBottom: SIZES.sm + 6,
            color: colors.text,
          }}
        >
          Your Progress
        </Text>
        <Text
          style={{
            fontSize: SIZES.sm + 3,
            marginBottom: SIZES.ss + 4,
            color: colors.text,
          }}
        >
          👌 Completed : 0
        </Text>
        <Text
          style={{
            fontSize: SIZES.sm + 3,
            marginBottom: SIZES.ss + 4,
            color: colors.text,
          }}
        >
          👎 Pending : 0
        </Text>
      </View>
      <View style={{ width: "30%" }}>
        <Image
          style={{ flex: 1, resizeMode: "contain", width: "80%" }}
          source={img}
        />
      </View>
    </View>
  );
};

export default Status;
