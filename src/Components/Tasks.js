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
  const deleteTask = (id) => {
    const itemsCopy = Data.filter((value) => {
      if (value.id !== id) {
        return value;
      }
    });
    setData(itemsCopy);
  };

  const restoreTask = (id) => {
    setData(
      Data.map((val) => {
        if (val.id === id) {
          return { ...val, completed: false, sets: val.setsCopy };
        }
        return val;
      })
    );
  };
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
        ) : null}
        {completed ? (
          <MaterialCommunityIcons
            name="delete"
            size={20}
            color={colors.text}
            onPress={() => deleteTask(id)}
            style={{ marginRight: SIZES.md }}
          />
        ) : null}
        {remainder ? (
          <MaterialCommunityIcons
            name="bell-ring"
            size={20}
            color={colors.text}
            style={{ marginRight: SIZES.md }}
          />
        ) : null}
        {completed === false ? (
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
        ) : null}

        {completed ? (
          <MaterialCommunityIcons
            name="reload"
            size={20}
            color={colors.text}
            onPress={() => {
              restoreTask(id);
            }}
          />
        ) : null}
      </View>
    </View>
  );
};

export default Tasks;
