import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text, ScrollView } from "react-native";
import Tasks from "./Tasks";

const CompletedTasks = ({ Data, navigation }) => {
  const { colors } = useTheme();
  const CompletedTask = Data.filter((val) => {
    if (val.completed === true) {
      return val;
    }
  });
  return (
    <ScrollView showsVerticalScrollIndicator={true}>
      {CompletedTask.length !== 0 ? (
        CompletedTask.map((item, idx) => (
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

export default CompletedTasks;
