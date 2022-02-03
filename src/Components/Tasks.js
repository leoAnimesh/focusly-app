import { useTheme } from "@react-navigation/native";
import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SIZES } from "../Styles/Constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FocusContext } from "../context/Focus/FocusState";
import PriorityLabel from "./PriorityLabel";

const Tasks = ({
  item: { focus, time, sets, date, remainder, priority, id, completed },
  navigation,
}) => {
  const { colors } = useTheme();
  const { deleteFocusTask } = useContext(FocusContext);

  return (
    <View
      style={[
        styles.conatiner,
        {
          backgroundColor: colors.card,
          borderColor: completed ? "green" : "red",
        },
      ]}
    >
      <View>
        <View style={{ flexDirection: "row" }}>
          <Text style={[styles.text, { color: colors.text }]}>{focus}</Text>
          <PriorityLabel value={priority} />
        </View>
        <Text style={[styles.subText, { color: colors.text }]}>{date}</Text>
      </View>
      <View style={styles.IconContainer}>
        {sets !== 0 ? (
          <MaterialCommunityIcons
            name={`numeric-${sets}-circle`}
            size={20}
            color={colors.text}
            style={styles.icon}
          />
        ) : null}
        {completed ? (
          <MaterialCommunityIcons
            name="delete"
            size={20}
            color={colors.text}
            style={styles.icon}
            onPress={() => deleteFocusTask(id)}
          />
        ) : null}
        {remainder ? (
          <MaterialCommunityIcons
            name="bell-ring"
            size={20}
            color={colors.text}
            style={styles.icon}
          />
        ) : null}
        {completed === false ? (
          <MaterialCommunityIcons
            name="play-circle"
            size={20}
            color={colors.text}
            style={styles.icon}
            onPress={() => {
              navigation.navigate("Focusing", {
                focus,
                time,
                sets,
                id,
              });
            }}
          />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    height: 72,
    paddingVertical: SIZES.sm,
    paddingHorizontal: SIZES.md,
    marginBottom: SIZES.md,
    borderRadius: SIZES.sm,
    borderLeftWidth: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: SIZES.sm + 5,
    fontWeight: "600",
    marginBottom: SIZES.ss,
  },
  subText: {
    fontSize: SIZES.sm + 2,
    opacity: 0.6,
    marginTop: SIZES.ss,
  },
  IconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginLeft: SIZES.sm + 5,
  },
});

export default Tasks;
