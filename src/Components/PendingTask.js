import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text, ScrollView } from "react-native";
import Tasks from "./Tasks";

const PendingTask = ({ Data, navigation }) => {
  const { colors } = useTheme();
  const PendingTask = Data.filter((val) => {
    if (val.completed === false) {
      return val;
    }
  });
  return (
    <ScrollView showsVerticalScrollIndicator={true}>
      {PendingTask.length !== 0 ? (
        PendingTask.map((item, idx) => (
          <Tasks navigation={navigation} key={idx} index={idx} item={item} />
        ))
      ) : (
        <Text style={{ color: colors.text, opacity: 0.8 }}>
          Nothing to focus on 😒
        </Text>
      )}
    </ScrollView>
  );
};

export default PendingTask;
