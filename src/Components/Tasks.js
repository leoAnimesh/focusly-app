import { useTheme } from "@react-navigation/native";
import React, { useContext } from "react";
import { View, Text } from "react-native";
import { LightColors, SIZES } from "../Styles/Constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FocusContext } from "../context/Focus";

const Tasks = ({
  item: { focus, time, sets, date, remainder, priority, id, completed },
  navigation,
}) => {
  const { colors } = useTheme();
  const { Data, setData } = useContext(FocusContext);
  return (
    <View
      style={{
        backgroundColor: colors.card,
        height: 67,
        paddingVertical: SIZES.sm,
        paddingHorizontal: SIZES.md,
        marginBottom: SIZES.md,
        borderRadius: SIZES.sm,
        borderLeftWidth: 4,
        borderColor: completed ? "green" : "red",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              fontSize: SIZES.sm + 5,
              fontWeight: "600",
              marginBottom: SIZES.ss,
              color: colors.text,
            }}
          >
            {focus}
          </Text>
          <View style={{ paddingHorizontal: 10 }}>
            <Text
              style={{
                backgroundColor: LightColors.primary,
                color: colors.text,
                fontSize: 13,
                paddingHorizontal: SIZES.ss + 3,
                paddingVertical: 1,
                borderRadius: 5,
              }}
            >
              {priority}
            </Text>
          </View>
        </View>
        <Text
          style={{
            fontSize: SIZES.sm + 2,
            opacity: 0.6,
            color: colors.text,
            marginTop: SIZES.ss,
          }}
        >
          {date}
        </Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {sets !== 0 ? (
          <MaterialCommunityIcons
            name={`numeric-${sets}-circle`}
            size={20}
            color={colors.text}
            style={{ marginRight: SIZES.md }}
          />
        ) : (
          <MaterialCommunityIcons
            name="delete"
            size={20}
            color={colors.text}
            onPress={deleteTask(id)}
            style={{ marginRight: SIZES.md }}
          />
        )}
        {remainder ? (
          <MaterialCommunityIcons
            name="bell-ring"
            size={20}
            color={colors.text}
            style={{ marginRight: SIZES.md }}
          />
        ) : null}
        <MaterialCommunityIcons
          name="play-circle"
          size={20}
          color={colors.text}
          onPress={() => {
            navigation.navigate("Focus", {
              focus,
              time,
              sets,
              id,
            });
          }}
        />
      </View>
    </View>
  );
};

export default Tasks;
